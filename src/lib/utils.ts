export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumberPad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
