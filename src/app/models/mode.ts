export enum ModeEnum {
  Singlebed,
  RibberClassic,
  RibberMiddleColorsTwice,
  RibberHeartOfPluto,
  RibberCircular,
}

export class Mode {
  public name(m: ModeEnum): String {
    switch(m) {
      case ModeEnum.Singlebed: {
        return "Singlebed";
      }
      case ModeEnum.RibberClassic: {
        return "Ribber: Classic";
      }
      case ModeEnum.RibberMiddleColorsTwice: {
        return "Ribber: Middle Colors Twice";
      }
      case ModeEnum.RibberHeartOfPluto: {
        return "Ribber: Heart of Pluto";
      }
      case ModeEnum.RibberCircular: {
        return "Ribber: Circular";
      }
    }
  }
}