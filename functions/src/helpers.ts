import * as Moment from 'moment';

export const makeid = () => {
  let text = '';
  const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( let i = 0; i < 11; i++ ) {
    text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
  }
  return text;
};

// helper method to get month
export const getMonth = (date = new Date()) => {
  const useDate = new Date(date);
  let month = '' + (useDate.getMonth() + 1);
  if (month.length < 2) { month = '0' + month; }
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

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }

  return [year, month, day].join('-');
};

export const calculateLoan =  (amountTaken: any, duration: any, currentLoanType: any) => {
  let return_amount = 0;
  let amount_per_return = 0;
  let total_profit_contribution = 0;
  if (amountTaken !== '' && duration !== '') {
    if (currentLoanType.profit_type === 'Fixed Percent') {
      return_amount = (parseInt(amountTaken, 10) + (amountTaken * (currentLoanType.profit_percent / 100)));
      amount_per_return = return_amount / duration;
      total_profit_contribution = return_amount - amountTaken;
    } else if (currentLoanType.profit_type  === 'Custom Formula') {
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
  return { return_amount, amount_per_return, total_profit_contribution };
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

export const token = 'groupsavings';
