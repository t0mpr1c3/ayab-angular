import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

import { MustMatch } from '../../helpers/must-match'; // custom validator
import { ErrorCheck } from '../../models/error-check';
import { GenericButton } from '../generic-button/generic-button';
import { AuthService } from '../../services/auth.service';
import { CancelService } from '../../services/cancel.service';
import { RegistrationCredentials } from '../../models/credentials';

@Component({
  standalone: true,
  selector: 'registration-form',
  templateUrl: 'registration-form.html',
  styleUrls: ['registration-form.css'],
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    CommonModule, 
    ReactiveFormsModule, 
    GenericButton,
    MatIconModule,
  ],
})
export class RegistrationForm extends ErrorCheck implements OnInit {
  public form!: FormGroup;
  public submitted: Boolean = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _cancelService: CancelService,
  ) {
    super();
  }

  // convenience getter function for form fields
  public get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(this.userNameMinLength), 
        Validators.maxLength(this.userNameMaxLength), 
        Validators.pattern("^[0-9a-zA-Z_]*$")
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength), 
        Validators.maxLength(this.passwordMaxLength)
      ]],
      confirm: ['', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength), 
        Validators.maxLength(this.passwordMaxLength)
      ]],
    }, { 
      validators: MustMatch('password', 'confirm') 
    });
  }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    
    let credentials = new RegistrationCredentials(
      this.f.username?.value,
      this.f.email?.value,
      this.f.password?.value,
    );
    //modal_dialog(
    console.log('registration:');
    console.log( this._authService.register$(credentials).subscribe());
    //
    this.onCancel();
  }

  public onReset() {
    this.submitted = false;
    this.form.reset();
  }

  public onCancel() {
    this._cancelService.emit();
  }
}