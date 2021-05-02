import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss'],
  animations: [
    trigger('titleState', [
      state('normal', style({})),
      state('above', style({
        display: 'block',
        position: 'absolute',
        top: '-11px',
        'background-color': '#141432',
        padding: '0 10px',
        height: '20px',
        'z-index': '3',
        left: '22px',
      })),
      state('above1', style({
        display: 'block',
        position: 'absolute',
        top: '-11px',
        'background-color': '#1D1D42',
        padding: '0 10px',
        height: '20px',
        'z-index': '3',
        left: '22px',
      })),
      // transition('normal => above', [
      //   animate('200ms ease-in', style({opacity: 1}))
      //   ]
      // ),
      // transition('normal => above1', animate('200ms ease-in'))
    ])
  ]
})
export class PeriodSelectorComponent implements OnInit, OnChanges {

  isOpen = false;
  @Input() inActiveBg = true;
  selectedPeriod = '';
  months = [
    {id: '01', name: 'January'},
    {id: '02', name: 'February'},
    {id: '03', name: 'March'},
    {id: '04', name: 'April'},
    {id: '05', name: 'May'},
    {id: '06', name: 'June'},
    {id: '07', name: 'July'},
    {id: '08', name: 'August'},
    {id: '09', name: 'September'},
    {id: '10', name: 'October'},
    {id: '11', name: 'November'},
    {id: '12', name: 'December'},
  ];
  usedMonths: { id: string; name: string; }[] = [];
  @Input() placeholder = 'Select period';
  @Input() currentYear: any = new Date().getFullYear();
  @Input() currentMonth;
  @Input() minMonth;
  @Input() exclude = [];
  @Input() clearAfterSelection = false;
  @Output() selected = new EventEmitter<{ month: { name: string; id: string }, year: any }>();
  years = [];
  selectedYear = this.currentYear;
  minYear;

  constructor() {
  }

  ngOnInit(): void {
    this.initiatePeriods();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initiatePeriods();
  }

  initiatePeriods() {
    if (this.currentMonth) {
      const monthDetails = this.months.find(i => i.id === this.currentMonth);
      this.selectedPeriod = monthDetails.name + ' ' + this.currentYear;
    } else {
      this.selectedPeriod = '';
    }
    this.generateYears();
    this.usedMonths = this.generateMonths();
  }

  generateMonths() {
    if (this.exclude.length === 0 && !this.minMonth) {
      return this.months;
    } else if (this.minMonth && this.exclude.length > 0) {
      return this.filterMonthsByExcluded(this.getPeriodByMinMonth());
    } else if (this.minMonth) {
      return this.getPeriodByMinMonth();
    } else if (this.exclude.length > 0) {
      return this.filterMonthsByExcluded(this.months);
    }
  }

  getPeriodByMinMonth() {
    let monthMin: any[];
    const year = this.minMonth.substr(0, 4);
    const month = this.minMonth.substr(4, 2);
    this.minYear = year + '';
    if (parseInt(year, 10) < parseInt(this.currentYear + '', 10)) {
      monthMin = this.months;
    } else if (parseInt(year, 10) === parseInt(this.currentYear + '', 10)) {
      monthMin = this.months.filter(i => parseInt(i.id, 10) > parseInt(month, 10));
    } else {
      monthMin = [];
    }
    return monthMin;
  }

  filterMonthsByExcluded(months) {
    return months.filter(month => {
      let check = true;
      for (const period of this.exclude) {
        const year = period.substr(0, 4);
        const monthData = period.substr(4, 2);
        if (monthData === month.id && parseInt(year, 10) === parseInt(this.currentYear + '', 10)) {
          check = false;
        }
      }
      return check;
    });
  }

  generateYears() {
    this.years = [];
    for (let i = -5; i < 10; i++) {
      this.years.push(this.currentYear + i);
    }
  }

  addCurrentYear() {
    this.currentYear++;
    this.generateYears();
    this.usedMonths = this.generateMonths();
  }

  reduceCurrentYear() {
    this.currentYear--;
    this.generateYears();
    this.usedMonths = this.generateMonths();
  }

  selectYear(year: any, event) {
    this.currentYear = year;
    this.generateYears();
    event.stopPropagation();
  }

  setSelectedPeriod(month: { name: string; id: string }) {
    this.selectedPeriod = month.name + ' ' + this.currentYear;
    this.isOpen = false;
    this.selected.emit({month, year: this.currentYear});
    if (this.clearAfterSelection) {
      this.selectedPeriod = '';
    }
  }
}

//
// function getWeekPeriodsInYear(year) {
//   weeks = [];
//
//   // Get the first and last day of the year
//   currentDay = moment([year, 1]).startOf('year');
//   dayOfWeek = moment(currentDay).day();
//   lastDay = moment([year, 1]).endOf('year');
//   weeksInYear = moment(`${year}-01-01`).isoWeeksInYear();
//   daysToAdd = 7 - dayOfWeek;
//
//   for (let weekNumber = 1; weekNumber < weeksInYear + 1; weekNumber++) {
//     let endOfWeek = moment(currentDay).add(daysToAdd, 'days');
//     if (moment(endOfWeek).year() !== year) {
//       endOfWeek = lastDay;
//     }
//     weeks.push({ weekNumber, start: currentDay.toDate(), end: endOfWeek.toDate() });
//     currentDay = endOfWeek.add(1, 'day');
//     daysToAdd = 6;
//   }
//   return weeks;
// }
