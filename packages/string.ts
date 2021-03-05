export function randomString(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function stringRepeat(str: string, times: number): string {
  return Array.from({ length: times }, (_v, _i) => str).join('');
}
