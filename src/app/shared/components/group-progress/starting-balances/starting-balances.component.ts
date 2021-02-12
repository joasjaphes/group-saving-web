import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../../animations/router-animation';
import {Group} from '../../../../store/group/group.model';
import {FunctionsService} from '../../../../services/functions.service';
import {CommonService} from '../../../../services/common.service';
import {ContributionType} from '../../../../store/contribution-type/contribution-type.model';

@Component({
  selector: 'app-starting-balances',
  templateUrl: './starting-balances.component.html',
  styleUrls: ['./starting-balances.component.scss'],
  animations: [fadeIn]
})
export class StartingBalancesComponent implements OnInit {
  @Input() group: Group;
  @Input() editing = false;
  @Input() contributions_need_balances: ContributionType[];
  @Output() closeForm = new EventEmitter();

  balances = {};
  loading = false;
  constructor(
    private functionsService: FunctionsService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    if (this.group) {
      if (this.group.contribution_balances) {
        const balances = Object
          .keys(this.group.contribution_balances)
          .map(i => ({
            amount: parseFloat(this.group.contribution_balances[i] + ''),
            id: i,
          })
      );
        balances.forEach(bal => {
          this.balances[bal.id] = bal.amount;
        });
      }
    }
  }

  get canSave() {
    let canSave = true;
    this.contributions_need_balances.forEach(i => {
      const val = this.balances[i.id] + '';
      if (!val) {
        canSave = false;
      }
    });
    return canSave;
  }

  async save() {
    this.loading = true;
    try {
      await this.functionsService.saveData('setContributionBalances', {
        groupId: this.group.id,
        balances: this.balances
      });
      this.loading = false;
      this.commonService.showSuccess('Contribution Balances set successful');
      this.onClose();
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  onClose() {
    this.closeForm.emit();
  }

}
