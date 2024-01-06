import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { GenericButton } from '../generic-button/generic-button';
import { CancelService } from '../../services/cancel.service';

@Component({
  standalone: true,
  selector: 'settings-form',
  templateUrl: 'settings-form.html',
  styleUrls: ['settings-form.css'],
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    CommonModule, 
    ReactiveFormsModule,
    MatIconModule,
    GenericButton,
  ],
})
export class SettingsForm implements OnInit {
  public form!: FormGroup;
  public submitted: Boolean = false;
  
  @Output() submit$: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.form = this._formBuilder.group({
    });
  }

  public constructor(
    public _formBuilder: FormBuilder,
    private _cancelService: CancelService,
  ) {}
  
  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //console.log(this.form.value);
    this.submit$.emit();
  }

  public onReset() {
    this.submitted = false;
    this.form.reset();
  }

  public onCancel() {
    this._cancelService.emit();
  }
}