import {Component, OnInit} from '@angular/core';
import {routeAnimations} from '../shared/animations/router-animation';
import {CommonService} from '../services/common.service';
import {Observable} from 'rxjs';
import {last, take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit {
  onlineStatusChecked = false;
  online$: Observable<boolean>;
  constructor(
    private commonService: CommonService
  ) {
    this.online$ = this.commonService.checkOnlineStatus();
    this.online$.pipe(take(3), last()).subscribe((_) => {
      this.onlineStatusChecked = true;
    });
  }

  ngOnInit(): void {}

}
