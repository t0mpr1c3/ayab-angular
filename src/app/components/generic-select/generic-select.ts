import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** 
 * @title Generic select
 **/
@Component({
  standalone: true,
  selector: 'generic-select',
  templateUrl: 'generic-select.html',
  styleUrls: ['generic-select.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class GenericSelect implements OnInit {
  @Input({required: true}) name: string;
  @Input({required: true}) enum: string;
  @Input({transform: numberAttribute}) defaultValue: number = 0;

  public selection: number;
  public options: string[] = [];

  ngOnInit(): void {
    this.options = JSON.parse(this.enum);
    this.refresh();
  }

  constructor() {
    this.refresh();
  }
  public refresh() {
    this.selection = this.defaultValue; // FIXME update from settings
  }
}