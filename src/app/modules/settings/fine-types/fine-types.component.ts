import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fine-types',
  templateUrl: './fine-types.component.html',
  styleUrls: ['./fine-types.component.scss']
})
export class FineTypesComponent implements OnInit {
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
