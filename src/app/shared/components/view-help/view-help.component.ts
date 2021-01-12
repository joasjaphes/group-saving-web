import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-view-help',
  templateUrl: './view-help.component.html',
  styleUrls: ['./view-help.component.scss'],
})
export class ViewHelpComponent implements OnInit {

  @Input() title = 'help';
  @Output() closeHelp = new EventEmitter();
  constructor() {}

  ngOnInit(): void { }
  onClose() {
    this.closeHelp.emit();
  }
}
