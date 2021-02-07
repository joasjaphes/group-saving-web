import { Component, Input, OnInit } from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../animations/router-animation';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit {
  @Input() title = '';
  @Input() image = '';
  @Input() icon = '';
  @Input() url;
  @Input() urlName = '';
  @Input() showHelp = false;
  @Input() loading = false;
  @Input() menuItems = [];
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  constructor(
    private commonService: CommonService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {}

  openHelp() {
    this.commonService.showHelp(this.title);
    console.log('Napokea');
  }
}
