import { Component, Inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RegistrationForm } from '../registration-form/registration-form';
import { LoginForm } from '../login-form/login-form';
import { SettingsForm } from '../settings-form/settings-form';
import { CancelService } from '../../services/cancel.service';

// permissable types of Form that can be used in Dialog
export interface DialogData {
  formType: 
    ComponentType<RegistrationForm> 
  | ComponentType<LoginForm>
  | ComponentType<SettingsForm>,
}

@Component({
  standalone: true,
  selector: 'form-dialog',
  templateUrl: 'form-dialog.html',
  styleUrls: ['form-dialog.css'],
  imports: [NgComponentOutlet],
})
export class FormDialog {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<FormDialog>,
    private _cancelService: CancelService,
  ) {
    this._cancelService.cancel$.subscribe(() => {
      this._dialogRef.close();
    });
  }
}