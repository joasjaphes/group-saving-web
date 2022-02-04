import * as Moment from 'moment';
import * as admin from 'firebase-admin';
import {PaymentModel} from './data-models/payment.model';
import {LoanModel} from './data-models/loan.model';

export const makeid = () => {
  let text = '';
  const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 11; i++) {
    text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
  }
  return text;
};

// This function will merger two objects adding the keys available in all items
export const mergeObjects = (
  paymentItem: { [id: string]: number },
  oldPaymentItem: { [id: string]: number },
  replace = true
) => {
  const objects = [paymentItem, oldPaymentItem];
  return objects.reduce((a, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (replace) {
        a[key] = parseFloat(val + '');
      } else {
        const value = a[key] ? parseFloat(a[key] + '') : 0;
        a[key] = value + parseFloat(val + '');
      }
    });
    return a;
  }, {});
};

export const deleteKeys = (
  oldPaymentItem: { [id: string]: number },
  paymentItem: string[],
) => {
  return Object.keys(oldPaymentItem).reduce((object: any, key: string) => {
    if (paymentItem.indexOf(key) === -1) {
      object[key] = oldPaymentItem[key];
    }
    return object;
  }, {});
};

export const preparePayment = (data: any, group: any, currentPayment: PaymentModel, replace = true): PaymentModel => {
  const memberPayments = currentPayment.members[data.memberId] ?? {
    id: makeid(),
    memberId: data.memberId,
    fines: {},
    contributions: {},
    loans: {},
  };

  return {
    ...currentPayment,
    members: {
      ...currentPayment.members,
      [memberPayments.memberId]: {
        ...memberPayments,
        fines: mergeObjects(memberPayments.fines, data.fines, replace),
        contributions: mergeObjects(memberPayments.contributions, data.contributions, replace),
        loans: mergeObjects(memberPayments.loans, data.loans, replace),
        referenceNumber: data.referenceNumber ?? '',
        paymentMode: data.paymentMode ?? '',
        date: formatDate(data.date),
      },
    },
  };
};

export const deleteContribution = (
  data: { memberId: string, keys: string[] },
  group: any,
  currentPayment: PaymentModel,
) => {
  const memberPayments = currentPayment.members[data.memberId];
  if (memberPayments) {
    return {
      ...currentPayment,
      members: {
        ...currentPayment.members,
        [memberPayments.memberId]: {
          ...memberPayments,
          fines: deleteKeys(memberPayments.fines, data.keys),
          contributions: deleteKeys(memberPayments.contributions, data.keys),
          loans: deleteKeys(memberPayments.loans, data.keys),
        },
      },
    };
  } else {
    return {...currentPayment};
  }
};

// This function is used to prepare empty payment if not exist
export const prepareEmptyPayment = (data: any, group: any): PaymentModel => {
  return {
    id: `period_${data.period}`,
    groupId: group.id,
    month: data.month ? data.month + '' : '',
    year: data.year + '',
    period: data.period,
    week: data.week ?? '',
    members: {},
  };
};

// This function is used to prepare empty loan if not exist
export const prepareEmptyLoan = (data: any, group: any): LoanModel => {
  return {
    id: `member_${data.memberId}`,
    groupId: group.id,
    memberId: data.memberId,
    loans: {},
  };
};


// helper method to get month
export const getMonth = (date = new Date()) => {
  const useDate = new Date(date);
  let month = '' + (useDate.getMonth() + 1);
  if (month.length < 2) {
    month = '0' + month;
  }
  return month;
};

// helper method to get year
export const getYear = (date = new Date()) => {
  const useDate = new Date(date);
  return useDate.getFullYear();
};

export const formatDate = (date: any) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};

export const calculateLoan = (amountTaken: any, duration: any, currentLoanType: any) => {
  let return_amount = 0;
  let amount_per_return = 0;
  let total_profit_contribution = 0;
  if (amountTaken !== '' && duration !== '') {
    if (currentLoanType.profit_type === 'Fixed Percent') {
      return_amount = (parseInt(amountTaken, 10) + (amountTaken * (currentLoanType.profit_percent / 100)));
      amount_per_return = return_amount / duration;
      total_profit_contribution = return_amount - amountTaken;
    } else if (currentLoanType.profit_type === 'Custom Formula') {
      // tslint:disable-next-line:no-eval
      const interest = eval(currentLoanType.loan_formular.replace('M', amountTaken + '').replace('T', duration + ''));
      return_amount = parseInt(amountTaken, 10) + parseInt(interest, 10);
      amount_per_return = return_amount / duration;
      total_profit_contribution = return_amount - amountTaken;
    } else {
      amount_per_return = amountTaken * (currentLoanType.profit_percent / 100);
      return_amount = (parseInt(amountTaken, 10) + (amountTaken * (currentLoanType.profit_percent / 100)));
      total_profit_contribution = 0;
    }
  }
  return {return_amount, amount_per_return, total_profit_contribution};
};

export const getNextMonth = (duration: any, startYear: string, startMonth: string) => {
  const loan_month = Moment(new Date(startYear + '-' + startMonth + '-01'));
  const return_date = loan_month.add(duration, 'M').format('MMMM YYYY');
  const end_year = return_date.split(' ')[1];
  const end_month = return_date.split(' ')[0];
  return {
    return_date,
    end_year,
    end_month,
  };
};


export const sendNotification = (data: { groupId: any, title: any, body: any }) => {
  const icon = 'https://sample-32870.firebaseapp.com/assets/img/donate.png';
  const {groupId, title, body} = data;
  let tokens = [];
  const tokensRef = admin.firestore().doc(`groups/${groupId}/devices/tokens`);
  return tokensRef.get().then((tokenDoc: any) => {
    tokens = tokenDoc.data().tokens;
    // Notification details.
    const payload = {
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        title,
        body,
      },
      notification: {
        title,
        body,
        icon,
      },
    };
    return admin.messaging().sendToDevice(tokens, payload);
  });
};


export const token = 'groupsavings';
