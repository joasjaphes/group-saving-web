import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {timer as observableTimer, Observable, of, BehaviorSubject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  showHElp1 = new BehaviorSubject(false);
  isLoading = new BehaviorSubject(false);
  helpText = new BehaviorSubject('');
  private onlineStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    public snackBar: MatSnackBar,
  ) {
  }


  showHelp(helpText) {
    this.helpText.next(helpText);
    this.showHElp1.next(true);
  }

  setIsLoading(val: boolean){
    this.isLoading.next(val);
  }

  closeHelp() {
    this.showHElp1.next(false);
  }

  checkOnlineStatus() {
    return observableTimer(1000, 10000)
      .pipe(
        switchMap(() => of(navigator.onLine)),
        tap((onlineStatus) => {
          this.onlineStatus$.next(onlineStatus);
        })
      );
  }

  makeId(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const first_possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 11; i++) {
      const charPosition = i === 0 ? Math.random() * first_possible_combinations.length : Math.random() * possible_combinations.length;
      text += possible_combinations.charAt(Math.floor(charPosition));
    }
    return text;
  }

  showSuccess(message: string = 'Success') {
    this.snackBar.open(message, 'Ok', {
      duration: 2500,
      panelClass: 'success'
    });
  }

  showError(message: string = 'Operation Failed', duration: number = 3500) {
    this.snackBar.open(message, 'Ok', {duration, panelClass: 'error'});
  }

  showWarning(message: string = 'Something went wrong', duration: number = 2500) {
    this.snackBar.open(message, 'Ok', {duration, panelClass: 'warning'});
  }


  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  dateRange(startDate, endDate) {
    const start = startDate.split('-');
    const end = endDate.split('-');
    const startYear = parseInt(start[0] + '', 10);
    const endYear = parseInt(end[0] + '', 10);
    const dates = [];

    for (let i = startYear; i <= endYear; i++) {
      const endMonth = i !== endYear ? 11 : parseInt(end[1] + '', 10) - 1;
      const startMon = i === startYear ? parseInt(start[1] + '', 10) - 1 : 0;
      for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        const month = j + 1;
        const displayMonth = month < 10 ? '0' + month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }

  capital_letter(str) {
    str = str.split(' ');

    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(' ');
  }


  getAmountInWords(totalAmount) {
    const amountToFloat = parseFloat(totalAmount).toFixed(2);
    const amount = amountToFloat.split('.');
    const firstNumber = this.getnumToWords(amount[0]);
    const secondNumber = this.getnumToWords(amount[1]);
    return secondNumber
      ? firstNumber + ' ' + 'and ' + secondNumber + ' cents'
      : firstNumber;
  }

  recentBannner(dateDetails) {
    let timeDifference: any;
    const now = moment(new Date()); // todays date
    const duration = moment.duration(now.diff(dateDetails));
    const minutes = parseInt(duration.asMinutes() + '', 10);
    const hours = parseInt(duration.asHours() + '', 10);
    const days = parseInt(duration.asDays() + '', 10);
    const months = parseInt(duration.asMonths() + '', 10);
    if (minutes <= 60) {
      let title = ' min ago';
      if (minutes > 1) {
        title = ' mins ago';
      }
      timeDifference = {
        duration: minutes + title,
        durationTitle: 'minutes',
      };
    } else if (minutes > 60 && hours <= 24) {
      let title = ' hour ago';
      if (hours > 1) {
        title = ' hours ago';
      }
      timeDifference = {
        duration: hours + title,
        durationTitle: 'hours',
      };
    } else if (hours > 24 && days <= 31) {
      let title = ' day ago';
      if (days > 1) {
        title = ' days ago';
      }
      timeDifference = {
        duration: days + title,
        durationTitle: 'days',
      };
    } else if (days > 31) {
      let title = ' month ago';
      if (months > 1) {
        title = ' months ago';
      }
      timeDifference = {
        duration: months + title,
        durationTitle: 'months',
      };
    }
    return timeDifference;
  }

  /* Convert amount to words */
  getnumToWords(num) {
    const digits = num.split('.');
    if (digits.length > 1) {
      const amountInWords = this.getNumToWords(digits[0]);
      const amountDecInWords = this.getDecNumToWords(digits[1]);
      return amountInWords + amountDecInWords;
    } else {
      const amountInWords = this.getNumToWords(digits[0]);
      return amountInWords;
    }
  }

  convertAmountToWords(totalAmount) {
    const amountToFloat = parseFloat(totalAmount).toFixed(2);
    const amount = amountToFloat.split('.');
    const firstNumber = this.getnumToWords(amount[0]);
    const secondNumber = this.getnumToWords(amount[1]);
    return secondNumber
      ? firstNumber + ' ' + 'and ' + secondNumber + ' cents'
      : firstNumber;
  }

  /*Convert cents into words*/
  getDecNumToWords(num) {
    let amt = num;
    if (amt.length < 2) {
      amt = num * 10;
    }
    const amount = this.getnumToWords(amt);
    if (amount) {
      return ' and ' + amount + ' cents';
    } else {
      return '';
    }
  }

  getNumToWords(num) {
    // Validates the number input and makes it a string
    if (typeof num === 'string') {
      num = parseInt(num, 10);
    }
    if (typeof num === 'number' && !isNaN(num) && isFinite(num)) {
      num = num.toString(10);
    } else {
      return 'This is not a valid number';
    }

    // Creates an array with the number's digits and
    // adds the necessary amount of 0 to make it fully
    // divisible by 3
    const digits = num.split('');
    let digitsNeeded = 3 - (digits.length % 3);
    if (digitsNeeded !== 3) {
      // prevents this : (123) ---> (000123)
      while (digitsNeeded > 0) {
        digits.unshift('0');
        digitsNeeded--;
      }
    }

    // Groups the digits in groups of three
    const digitsGroup = [];
    const numberOfGroups = digits.length / 3;
    for (let i = 0; i < numberOfGroups; i++) {
      digitsGroup[i] = digits.splice(0, 3);
    }
    // console.log(digitsGroup) // debug

    // Change the group's numerical values to text
    const digitsGroupLen = digitsGroup.length;
    const numTxt = [
      [
        null,
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ], // hundreds
      [
        null,
        'ten',
        'twenty',
        'thirty',
        'forty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety',
      ], // tens
      [
        null,
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ], // ones
    ];
    const tenthsDifferent = [
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];

    //  j maps the groups in the digitsGroup
    //  k maps the element's position in the group to the numTxt equivalent
    //  k values: 0 = hundreds, 1 = tens, 2 = ones
    for (let j = 0; j < digitsGroupLen; j++) {
      for (let k = 0; k < 3; k++) {
        const currentValue = digitsGroup[j][k];
        digitsGroup[j][k] = numTxt[k][currentValue];
        if (k === 0 && currentValue !== '0') {
          //  !==0 avoids creating a string "null hundred"
          digitsGroup[j][k] += ' hundred ';
        } else if (k === 1 && currentValue === '1') {
          // Changes the value in the tens place and erases the value in the ones place
          digitsGroup[j][k] = tenthsDifferent[digitsGroup[j][2]];
          digitsGroup[j][2] = 0; // Sets to null. Because it sets the next k to be evaluated, setting this to null doesn't work.
        }
      }
    }

    // console.log(digitsGroup) // debug

    //  Adds '-' for grammar, cleans all null values, joins the group's elements into a string
    for (let l = 0; l < digitsGroupLen; l++) {
      if (digitsGroup[l][1] && digitsGroup[l][2]) {
        digitsGroup[l][1] += '-';
      }
      digitsGroup[l].filter((e) => {
        return e !== null;
      });
      digitsGroup[l] = digitsGroup[l].join('');
    }

    //  console.log(digitsGroup) // debug

    // Adds thousand, millions, billion and etc to the respective string.
    const posfix = [
      null,
      'thousand',
      'million',
      'billion',
      'trillion',
      'quadrillion',
      'quintillion',
      'sextillion',
    ];
    if (digitsGroupLen > 1) {
      const posfixRange = posfix.splice(0, digitsGroupLen).reverse();
      for (let m = 0; m < digitsGroupLen - 1; m++) {
        // '-1' prevents adding a null posfix to the last group
        if (digitsGroup[m]) {
          //  avoids 10000000 being read (one billion million)
          digitsGroup[m] += ' ' + posfixRange[m];
        }
      }
    }

    //  console.log(digitsGroup) // debug

    //  Joins all the string into one and returns it
    return digitsGroup.join(' ');
  } //  End of numToWords function

  formatDate(dateReceived) {
    return dateReceived ? moment(dateReceived).format('YYYY-MM-DD') : '';
  }

  getDateFromToday(date: Date, type, amount) {
    if (type === 'Monthly') {
      return moment(date).add(amount, 'months').format();
    } else if (type === 'Weekly') {
      return moment(date).add(amount, 'weeks').format();
    } else {
      return moment(date).add(amount, 'months').format();
    }
  }

}
