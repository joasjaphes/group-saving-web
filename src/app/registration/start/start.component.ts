import { Component, OnInit } from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ExcelReaderService} from '../../services/excel-reader.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private excelDownloadService: ExcelReaderService,
  ) { }

  ngOnInit(): void {

  }

  downloadExcel() {
    const columns = [{
      name: 'Name',
      valueType: 'TEXT',
    }, {
      name: 'Gender',
      valueType: 'TEXT',
      options: ['MALE', 'FEMALE']
    }, {
      name: 'Phone Number',
      valueType: 'TEXT',
    },
    ];
    this.excelDownloadService.generateExcelTemplate(columns, 'Sheet 1', 'sample').then();
  }

}
