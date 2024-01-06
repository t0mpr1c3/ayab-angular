export enum MachineEnum {
  KH910_KH950,
  KH900_KH930_KH940_KH965,
  KH270,
}

export class Machine {
  public name(m: MachineEnum): String {
    switch(m) {
      case MachineEnum.KH910_KH950: {
        return "KH-910, KH-950i";
      }
      case MachineEnum.KH900_KH930_KH940_KH965: {
        return "KH-900, KH-930, KH-940, KH-965i";
      }
      case MachineEnum.KH270: {
        return "KH-270";
      }
    }
  }

  public width(m: MachineEnum): number {
    switch(m) {
      case MachineEnum.KH270: {
        return 112;
      }
      default: {
        return 200;
      }
    }
  }
}