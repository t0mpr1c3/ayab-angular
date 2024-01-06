export function enumCount(enumName: any): number {
  let count = 0;
  for (let item in enumName) {
      if (isNaN(Number(item))) {
        count++;
      }
  }
  return count;
}

export function enumArray(enumName: any): any[] {
  let count = enumCount(enumName);
  let keys = [...Array(count).keys()];
  return keys.map(key => enumName[key]);
}

export function enumString(enumName: any): string {
  return JSON.stringify(enumArray(enumName));
}