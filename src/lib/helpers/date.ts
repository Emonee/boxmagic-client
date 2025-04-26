import type { Day } from "../../types/jsonBin";

export function getNextDayDate(day: Day) {
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    if (date.getDay() === day) return date;

    date.setDate(date.getDate() + 1);
  }
  return null;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
