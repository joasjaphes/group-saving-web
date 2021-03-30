import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../../store/group/group.model';
import {Expense} from '../../../../store/expense/expense.model';
import {CommonService} from '../../../../services/common.service';
import {FunctionsService} from '../../../../services/functions.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {deleteExpense} from '../../../../store/expense/expense.actions';

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
    private store: Store<ApplicationState>
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
      this.store.dispatch(deleteExpense({id: this.currentExpense.id}));
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
