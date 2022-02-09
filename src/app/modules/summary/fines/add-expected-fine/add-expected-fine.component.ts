import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {FineType} from '../../../../store/fine-type/fine-type.model';
import {Member} from '../../../../store/member/member.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {fadeIn} from '../../../../shared/animations/router-animation';

@Component({
  selector: 'app-add-expected-fine',
  templateUrl: './add-expected-fine.component.html',
  styleUrls: ['./add-expected-fine.component.css'],
  animations: [fadeIn]
})
export class AddExpectedFineComponent implements OnInit {
  @Input() group: Group;
  @Input() fineTypes: FineType[];
  @Input() members: Member[];
  @Output() closeForm = new EventEmitter();

  loading = false;
  memberId: string = '';
  searchKey: string = '';
  total: number = 0;
  selectedFineTypes: FineType[] = [];
  fineAmounts: any = {};
  selectedFines: any = {};
  year = new Date().getFullYear();
  period;
  month: string;
  @Input() member: Member;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
    if (this.member) {
      this.memberId = this.member.id;
    }
  }

  onClose() {
    this.closeForm.emit();
  }


  setMember(memberId) {
    this.member = this.members.find(i => i.id === memberId);
  }

  findTotal() {
    let sum = 0;
    Object.keys(this.fineAmounts).forEach(item => {
      const val = this.fineAmounts[item];
      if (val) {
        sum += parseFloat(val);
      }
    });
    this.total = sum;
  }

  enableFine(checked: boolean, fineType: FineType) {
    if (checked ) {
      if (fineType.calculation === 'Fixed') {
        this.fineAmounts[fineType.id] = fineType.fixed_amount;
        this.findTotal();
      }
    } else {
      this.fineAmounts = Object.keys(this.fineAmounts).reduce((object: any, key: string) => {
        if (key !== fineType.id) {
          object[key] = this.fineAmounts[key];
        }
        return object;
      }, {});
      this.findTotal();
    }
  }

  async save() {
    // { groupId, month, year, period, memberId, fineAmounts}
    let dataToSave = {
      groupId: this.group.id,
      memberId: this.memberId,
      fineAmounts: this.fineAmounts,
      date: `${this.year}-${this.month}-01`,
      year: this.year,
      month: this.month,
      period: this.period ?? `${this.year}${this.month}`,
    };

    this.loading = true;
    try {
      await this.functionsService.saveData('addExpectedFines', dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Expected fine from ' + this.member.name + ' Submitted Successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Expected fine was not assigned successful');
      console.error(e);
    }
  }

  setPeriod($event: { month: { name: string; id: string }; year: any }) {
    this.year = $event.year;
    this.month = $event.month.id;
    this.period = `${$event.year}${$event.month.id}`;
  }
}
