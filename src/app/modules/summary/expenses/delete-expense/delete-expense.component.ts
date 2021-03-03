import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Expense} from '../../../../store/expense/expense.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html',
  styleUrls: ['./delete-expense.component.scss']
})
export class DeleteExpenseComponent implements OnInit {
  @Input() group: Group;
  @Input() currentExpense?: Expense;
  @Output() closeForm = new EventEmitter();

  loading = false;
  constructor(
    private commonService: CommonService,
    private functionsService: FunctionsService,
  ) { }

  ngOnInit(): void {
  }

  async save() {
    const dataToSave = {
      id: this.currentExpense.id,
      groupId: this.group.id,
    };
    this.loading = true;
    try {
      const saveFunction = this.currentExpense ? 'deleteExpense' : 'createExpense';
      await this.functionsService.saveData(saveFunction, dataToSave);
      this.loading = false;
      this.commonService.showSuccess('Expense saved Successful');
      this.closeDialog();
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Expense was not saved successful');
      console.error(e);
    }
  }

  closeDialog() {
    this.closeForm.emit();
  }

}
