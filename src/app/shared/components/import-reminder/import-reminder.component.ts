import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn} from '../../animations/router-animation';

@Component({
  selector: 'app-import-reminder',
  templateUrl: './import-reminder.component.html',
  styleUrls: ['./import-reminder.component.css'],
  animations: [fadeIn]
})
export class ImportReminderComponent implements OnInit {

  @Output() setExisting = new EventEmitter();
  showConfirm: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openModel() {

  }

  dontImport() {
   localStorage.setItem('have_existing_data', 'YES');
   setTimeout(() => this.setExisting.emit(), 100)

  }
}
