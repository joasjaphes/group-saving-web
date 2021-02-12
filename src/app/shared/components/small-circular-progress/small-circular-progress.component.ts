import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-small-circular-progress',
  templateUrl: './small-circular-progress.component.html',
  styleUrls: ['./small-circular-progress.component.scss']
})
export class SmallCircularProgressComponent implements OnInit, OnChanges {

  @Input() value = 40;
  @Input() titleText = 'L';
  @Input() useText = true;
  @Input() radius = 40;
  pact = 0;
  constructor() { }

  ngOnInit(): void {
    this.calculatePact();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculatePact();
  }

  calculatePact() {
    const c = Math.PI * (this.radius * 2);
    let val;
    if (this.value > 100) { val = 100; }
    else if (this.value < 0) { val = 0; }
    else { val = this.value; }
    this.pact = ((100 - val) / 100) * c;
  }

}
