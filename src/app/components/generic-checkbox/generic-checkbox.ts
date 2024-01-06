import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

/**
 * @title Generic checkbox
 */
@Component({
    standalone: true,
    selector: 'generic-checkbox',
    templateUrl: 'generic-checkbox.html',
    styleUrls: ['generic-checkbox.css'],
    imports: [
      MatCheckboxModule, 
      FormsModule,
    ]
})
export class GenericCheckbox {
  public checked: string;

  @Input({required: true}) name: string;
  @Input({transform: booleanAttribute}) defaultValue: boolean = false;

  @Output() clicked: EventEmitter<Boolean> = new EventEmitter();

  public onClick(event: MatCheckboxChange) {
    this.clicked.emit(event.checked);
  }
}