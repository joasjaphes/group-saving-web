import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { fadeIn } from '../../animations/router-animation';

@Component({
  selector: 'app-save-area',
  templateUrl: './save-area.component.html',
  styleUrls: ['./save-area.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveAreaComponent {
  @Input() saveDisabled = false;
  @Input() confirmFirst = false;
  @Input() showCancel = true;
  @Input() saveText = 'Save';
  @Input() saveColor = 'primary';
  @Input() saveIcon = 'save';
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Are you sure you want to perform this action?';
  @Output() save = new EventEmitter();
  @Output() firstButtonClick = new EventEmitter();
  @Output() cancelShowConfirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() loadingMessage = 'Saving Data Please Wait...';
  @Input() savingData = false;
  @Input() hideSave = false;
  showConfirm = false;
  constructor() { }

  onSave(sendRequest = false) {
    if (this.confirmFirst && sendRequest) {
      this.firstButtonClick.emit();
      this.showConfirm = true;
    } else {
      this.save.emit();
      this.showConfirm = false;
    }
  }

  onCancelShowConfirm() {
    this.showConfirm = false;
    this.cancelShowConfirm.emit();
  }

  onClose() {
    this.cancel.emit();
  }
}
