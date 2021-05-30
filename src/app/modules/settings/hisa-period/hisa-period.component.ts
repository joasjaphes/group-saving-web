import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Group} from '../../../store/group/group.model';
import {CommonService} from '../../../services/common.service';
import {FunctionsService} from '../../../services/functions.service';
import {fadeIn} from '../../../shared/animations/router-animation';
import {PeriodSelectorComponent} from '../../../shared/components/period-selector/period-selector.component';
import {SharePeriod} from '../../../store/share-period/share-period.model';

@Component({
  selector: 'app-hisa-period',
  templateUrl: './hisa-period.component.html',
  styleUrls: ['./hisa-period.component.scss'],
  animations: [fadeIn]
})
export class HisaPeriodComponent implements OnInit {

  @Input() group: Group;
  @Output() closeForm = new EventEmitter();

  currentStartDate: any;
  distributionDate: any;
  loading = false;
  dates: SharePeriod[] = [];
  startMonth;
  startMonthDetailed: { month: {id: string, name: string}, year: any };
  endMonthDetailed: { month: {id: string, name: string}, year: any };
  endMonth;
  @ViewChild('startMonthSelector') startMonthSelector: PeriodSelectorComponent;
  @ViewChild('endMonthSelector') endMonthSelector: PeriodSelectorComponent;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
    if (this.group) {
      this.dates = this.group.share_periods;
    }
  }

  onClose() {
    this.closeForm.emit();
  }

  async save() {
    const dataToSave = {
      groupId: this.group.id,
      dates: this.dates,
    };
    this.loading = true;
    try {
      await this.functionsService.saveData('setShareTimeline', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Share Period information Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Share period was not assigned successful');
      console.error(e);
    }
  }

  addPeriod() {
    const dataToSave: SharePeriod = {
      id: this.commonService.makeId(),
      isCurrent: false,
      startMonth: this.startMonth,
      endMonth: this.endMonth,
      start: this.startMonthDetailed,
      end: this.endMonthDetailed,
    };
    this.dates.push(dataToSave);
    this.startMonthSelector.clear();
    this.endMonthSelector.clear();
    this.startMonth = '';
    this.endMonth = '';
    this.startMonthDetailed = null;
    this.endMonthDetailed = null;
  }

  isCurrentPeriod(date: SharePeriod): boolean {
    const start = new Date(`${date.start.year}-${date.start.month.id}-01`);
    const end = new Date(`${date.end.year}-${date.end.month.id}-01`);
    const today = new Date();
    return today > start && today < end;
  }

  deleteDate(date: any) {
    this.dates = this.dates.filter(i => i.id !== date.id);
  }

  setStartMonthAndYear($event: { month: {id: string, name: string}, year: any }) {
    this.startMonth = `${$event.year}${$event.month.id}`;
    this.startMonthDetailed = $event;
  }

  setEndMonthAndYear($event: { month: {id: string, name: string}, year: any }) {
    this.endMonth = `${$event.year}${$event.month.id}`;
    this.endMonthDetailed = $event;
  }
}
