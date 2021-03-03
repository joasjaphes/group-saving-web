import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-save-loader',
  templateUrl: './save-loader.component.html',
  styleUrls: ['./save-loader.component.scss'],
  animations: [
    trigger('letterPosition', [
      state('starting', style({
        transform: 'translateX(-110%) translateY(-100%)',
        opacity: 0.1,
      })),
      // state('ending', style({
      //   transform: 'translateX(1000%)',
      // })),
      transition('starting => ending',
        [
          style({
            opacity: 1,
          }),
          animate('2000ms ease-in', style({
            transform: 'translateY(-100%) translateX(500%)',
            opacity: 1
          })),
          animate('2000ms ease-out', style({
            transform: 'translateY(-100%) translateX(1000%)',
            opacity: 1
          }))
        ],
      ),
      transition('ending => starting',
        [
          style({
            opacity: 1,
          }),
          animate('2000ms ease-in', style({
            transform: 'translateY(-100%) translateX(500%)',
            opacity: 1
          })),
          animate('2000ms ease-out', style({
            transform: 'translateY(-100%) translateX(-100%)',
            opacity: 1
          }))
        ],
      ),

    ]),
  ]
})
export class SaveLoaderComponent implements OnInit {

  position = 'starting';
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.position = 'ending';
    }, 1000);
  }

  animEnd($event: any) {
    this.position = this.position === 'starting' ? 'ending' : 'starting';
  }
}
