const EPSILON = 0.0000001;

export function looseCompare(a: number, b: number, epsilon?: number) {
  return Math.abs(a - b) <= (epsilon ?? EPSILON);
}

export function looseFloor(float: number, epsilon?: number) {
  const ceil = Math.ceil(float);
  return looseCompare(ceil, float, epsilon) ? ceil : Math.floor(float);
}
export function looseCeil(float: number, epsilon?: number) {
  const floor = Math.floor(float);
  return looseCompare(floor, float, epsilon) ? floor : Math.ceil(float);
}

/** 0.123456 with precision 3 would become 0.123. And 0.123 with precision 6 will stay as 0.123 instead of 0.123000.*/
export function toLoosePrecision(num: number, precision: number = 6): number {
  const exp = 10 ** precision;
  return looseFloor(num * exp) / exp;
}

export function toMoneyPrecision(money: number): number {
  const money100 = money * 100;
  const scaledEpsilon = EPSILON * 100;

  if (looseCompare(money100, Math.floor(money100), scaledEpsilon)) {
    return Math.floor(money100) / 100;
  } else {
    return Math.ceil(money100) / 100;
  }
}
