import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-transfers',
  templateUrl: './cash-transfers.component.html',
  styleUrls: ['./cash-transfers.component.scss']
})
export class CashTransfersComponent implements OnInit {
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
