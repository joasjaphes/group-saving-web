import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../store/group/group.model';
import {ContributionType} from '../../../store/contribution-type/contribution-type.model';
import {FineType} from '../../../store/fine-type/fine-type.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import * as groupSelector from '../../../store/group/group.selectors';
import * as contributionTypeSelector from '../../../store/contribution-type/contribution-type.selectors';
import * as fineTypeSelector from '../../../store/fine-type/fine-type.selectors';

@Component({
  selector: 'app-fine-types',
  templateUrl: './fine-types.component.html',
  styleUrls: ['./fine-types.component.scss']
})
export class FineTypesComponent implements OnInit {
  group$: Observable<Group>;
  contributionTypes$: Observable<ContributionType[]>;
  fineTypes$: Observable<FineType[]>;
  currentFineType: FineType;
  viewDetails = false;
  panelTitle = '';
  viewType = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.group$ = this.store.pipe(select(groupSelector.selected));
    this.contributionTypes$ = this.store.pipe(select(contributionTypeSelector.selectDetailed));
    this.fineTypes$ = this.store.pipe(select(fineTypeSelector.selectDetailed));
  }

  ngOnInit(): void {
  }

  addItem() {
    this.viewDetails = true;
    this.panelTitle = 'Add new fine type';
    this.viewType = 'add';
  }

  closePanel() {
    this.currentFineType = null;
    this.viewDetails = false;
    this.panelTitle = '';
    this.viewType = '';
  }

  edit(contr: FineType) {
    this.currentFineType = contr;
    this.viewDetails = true;
    this.panelTitle = 'Update ' + contr.description;
    this.viewType = 'add';
  }

  delete(contr: FineType) {
    console.log('deleting', contr);
  }
}
