import * as Moment from 'moment';
import * as admin from 'firebase-admin';
import {PaymentModel} from './data-models/payment.model';
import {LoanModel, SingleLoanModel} from './data-models/loan.model';
import {OneTimePaymentModel} from './data-models/one-time-payment.model';
import {ExpectedFineModel} from './data-models/expected-fine.model';
import {LoanRequestModel} from './data-models/loan-request.model';

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
    startingAmount: {},
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
        startingAmount: mergeObjects(memberPayments.startingAmount ?? {}, data.startingAmount, replace),
        referenceNumber: data.referenceNumber ?? '',
        paymentMode: data.paymentMode ?? '',
        confirmationMessage: data.confirmationMessage ?? '',
        fileUrl: data.fileUrl ?? '',
        date: formatDate(data.date),
      },
    },
  };
};

export const prepareOneTimePayment = (data: any, group: any, currentPayment: OneTimePaymentModel, replace = true): OneTimePaymentModel => {
  const memberPayments = currentPayment.members[data.memberId] ?? {
    id: makeid(),
    memberId: data.memberId,
    amount: data.amount,
    referenceNumber: data.referenceNumber ?? '',
    paymentMode: data.paymentMode ?? '',
    date: formatDate(data.date),
  };

  return {
    ...currentPayment,
    members: {
      ...currentPayment.members,
      [memberPayments.memberId]: {
        ...memberPayments,
        amount: data.amount,
        referenceNumber: data.referenceNumber ?? '',
        paymentMode: data.paymentMode ?? '',
        date: formatDate(data.date),
      },
    },
  } as OneTimePaymentModel;
};

export const prepareExpectedFine = (data: any, group: any, currentFines: ExpectedFineModel, replace = true): ExpectedFineModel => {
  return {
    ...currentFines,
    fines: [
      ...currentFines.fines,
      {
        id: makeid(),
        memberId: data.memberId,
        groupId: group.id,
        month: data.month ? data.month + '' : '',
        year: data.year + '',
        period: data.period,
        fines: data.fineAmounts ?? {},
        week: data.week ?? '',
        date: data.date ?? '',
      },
    ],
  }
};

export const prepareLoanRequest = (data: any, group: any, currentFines: LoanRequestModel, replace = true): LoanRequestModel => {
  return {
    ...currentFines,
    loans: [
      ...currentFines.loans,
      {
        id: makeid(),
        memberId: data.memberId,
        groupId: group.id,
        loanTypeId: data.loanTypeId,
        loanId: data.loanId,
        approvalStatus: 'PENDING',
        approvals: {},
        guarantors: [],
      },
    ],
  }
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
          startingAmount: deleteKeys(memberPayments.startingAmount ?? {}, data.keys),
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

// This function is used to prepare empty payment if not exist
export const prepareEmptyOneTimePayment = (data: any, group: any): OneTimePaymentModel => {
  return {
    id: `contribution_${data.contributionId}`,
    groupId: group.id,
    contributionId: data.contributionId,
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


export const prepareLoan = (loanId: string, data: any, currentLoanType: any, last_update: any): SingleLoanModel => {
  const loan: SingleLoanModel = {
    id: loanId,
    group_id: data.groupId,
    last_update,
    member_id: data.memberId,
    loan_used: data.loanUsed,
    amount_taken: data.amountTaken,
    duration: data.duration,
    duration_type: currentLoanType ? currentLoanType.duration_type : 'Monthly',
    total_amount_to_pay: data.return_amount || 0,
    amount_paid_to_date: 0,
    amount_per_return: data.amount_per_return || 0,
    date: formatDate(data.date),
    expected_date_of_payment: formatDate(data.end_date),
    start_month: getMonth(data.date),
    start_year: getYear(data.date) + '',
    end_month: getMonth(data.end_date),
    end_year: getYear(data.end_date) + '',
    account_used: currentLoanType.contribution_type_id,
    total_profit_contribution: data.total_profit_contribution,
    remaining_balance: data.remaining_balance || 0,
    payments: [],
    additional_config: {},
  };
  if (data.payments && data.payments.length !== 0) {
    loan.payments = data.payments.map(
      (payment: any) => ({
        id: payment.id,
        month: payment.month ?? '',
        year: payment.year,
        week: payment.week ?? '',
        period: payment.period,
        amount: payment.amount,
        paid_on_time: true,
        date_of_payment: formatDate(payment.date),
        previous_balance: payment.previous_balance,
        new_balance: payment.new_balance,
        from_previous_loan: true,
      })
    );
  }
  loan.amount_paid_to_date = data.amount_returned;
  loan.remaining_balance = data.remaining_balance;
  return loan;
}

export const token = 'groupsavings';
