export function getFormattedDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${
    date.getMonth() + 1
  }-${date.getDate() < 9 ? "0" : ""}${date.getDate() + 1}`
}

export function getDateMinusdays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
