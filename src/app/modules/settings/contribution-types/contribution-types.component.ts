import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contribution-types',
  templateUrl: './contribution-types.component.html',
  styleUrls: ['./contribution-types.component.scss']
})
export class ContributionTypesComponent implements OnInit {
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
