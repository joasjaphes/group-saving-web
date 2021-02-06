import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-types',
  templateUrl: './loan-types.component.html',
  styleUrls: ['./loan-types.component.scss']
})
export class LoanTypesComponent implements OnInit {
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new expense';
    this.viewType = 'add';
  }

  closePanel() {
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

}
