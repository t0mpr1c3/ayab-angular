import { AlignmentEnum } from './alignment';
import { MachineEnum } from './machine';
import { ModeEnum } from './mode';

export class Settings {
  public machine: MachineEnum;
  public default_knitting_mode: ModeEnum;
  public infinite_repeat: Boolean;
  public default_alignment: AlignmentEnum;
  public default_knit_side_image: Boolean;
  public quiet_mode: Boolean;
  //language: LanguageEnum; /* search available locales */

  constructor() {
    this.reset();
  }
  
  // reset to defaults
  public reset() {
    this.machine = MachineEnum.KH910_KH950;
    this.default_knitting_mode = ModeEnum.Singlebed;
    this.infinite_repeat = false;
    this.default_alignment = AlignmentEnum.Center;
    this.default_knit_side_image = false;
    this.quiet_mode = false;
  }
}

export var defaultSettings = new Settings();