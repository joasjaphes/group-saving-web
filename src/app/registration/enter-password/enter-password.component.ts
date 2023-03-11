import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  fadeIn,
  ROUTE_ANIMATIONS_ELEMENTS,
} from '../../shared/animations/router-animation';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss'],
  animations: [fadeIn],
})
export class EnterPasswordComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() email: string;
  @Input() memberName: string;
  @Input() phoneNumber: string;
  @Output() nextStep = new EventEmitter<{
    currentStep: string;
    previousStep: string;
  }>();
  password: string;
  hide = true;
  @ViewChild('myInput') myInputField: ElementRef;
  loading: any;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.myInputField.nativeElement.focus());
  }

  async login() {
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.commonService.showError('Incorrect Username or Password');
    }
  }
}
