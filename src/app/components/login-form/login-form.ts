import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable, debounceTime, first, fromEvent, tap } from 'rxjs';

import { ErrorCheck } from '../../models/error-check';
import { GenericButton } from '../generic-button/generic-button';
import { CancelService } from '../../services/cancel.service';
import { AuthMachineService } from '../../services/auth-machine/auth-machine.service';
import { LoginSubmit } from '../../services/auth-machine/auth-machine.events';

@Component({
  standalone: true,
  selector: 'login-form',
  templateUrl: 'login-form.html',
  styleUrls: ['login-form.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    GenericButton,
  ],
})
export class LoginForm extends ErrorCheck implements OnInit {
  public canceled = false;
  public form: FormGroup;
  public loading$: Observable<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private _authMachineService: AuthMachineService,
    private _cancelService: CancelService,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(this.userNameMinLength), 
        Validators.maxLength(this.userNameMaxLength), 
        Validators.pattern("^[0-9a-zA-Z_]*$")
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength), 
        Validators.maxLength(this.passwordMaxLength)
      ]],
    });
  }

  // convenience getter to access form fields
  public get f() { return this.form.controls; }

  public onSubmit(): void {
    if (this.form.invalid || this.canceled) {
      return;
    }
      
    this._authMachineService.service.send(
      new LoginSubmit(this.f.username?.value, this.f.password?.value)
    );
  }  

  public onCancel(): void {
    this.canceled = true;
    this._cancelService.emit();
  }
}
