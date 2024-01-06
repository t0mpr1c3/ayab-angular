import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { Toolbar } from '../toolbar/toolbar';
import { OptionsForm } from '../options-form/options-form';
import { RowInput } from '../row-input/row-input';
import { ColorsInput } from '../colors-input/colors-input';
import { NeedleInput } from '../needle-input/needle-input';
import { GenericSelect } from '../generic-select/generic-select';
import { GenericCheckbox } from '../generic-checkbox/generic-checkbox';
import { PortSelect } from '../port-select/port-select';
import { enumString } from '../../helpers/enum';
import { ModeEnum } from '../../models/mode';
import { AlignmentEnum } from '../../models/alignment';

/**
 * @title Application root
 */
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app-root.html',
  styleUrls: ['app-root.css'],
  imports: [
    Toolbar, 
    OptionsForm, 
    PortSelect,
    RowInput, 
    ColorsInput, 
    NeedleInput, 
    GenericSelect, 
    GenericCheckbox,
    MatDividerModule,
  ]
})
export class AppComponent {
  public modeEnum = enumString(ModeEnum);
  public alignmentEnum = enumString(AlignmentEnum);
  public knitSideImageSetting: Boolean;

  public knitSideImageCheckboxClicked(val: Boolean) {
    this.knitSideImageSetting = val;
    // FIXME update local storage object
  }
}