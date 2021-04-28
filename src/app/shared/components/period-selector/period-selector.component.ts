import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnInit {

  isOpen = false;
  placeholder = 'Select period';
  selectedPeriod = '';
  months = [
    { id: '01', name: 'January'},
    { id: '02', name: 'February'},
    { id: '03', name: 'March'},
    { id: '04', name: 'April'},
    { id: '05', name: 'May'},
    { id: '06', name: 'June'},
    { id: '07', name: 'July'},
    { id: '08', name: 'August'},
    { id: '09', name: 'September'},
    { id: '10', name: 'October'},
    { id: '11', name: 'November'},
    { id: '12', name: 'December'},
  ];
  @Input() currentYear: any = new Date().getFullYear();
  @Input() currentMonth;
  @Input() clearAfterSelection = false;
  @Output() selected = new EventEmitter();
  years = [];
  constructor() { }

  ngOnInit(): void {
    if (this.currentMonth) {
      const monthDetails = this.months.find(i => i.id === this.currentMonth);
      this.selectedPeriod = monthDetails.name + ' ' + this.currentYear;
    } else {
      this.selectedPeriod = '';
    }
    this.generateYears();
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
  }

  reduceCurrentYear() {
    this.currentYear--;
    this.generateYears();
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
