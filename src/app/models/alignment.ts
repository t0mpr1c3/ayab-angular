export enum AlignmentEnum {
  Center,
  Left,
  Right,
}

export class Alignment {
  public name(x: AlignmentEnum): String {
    return AlignmentEnum[x];
  }
}