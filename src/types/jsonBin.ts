export type BoxMagixConfig = {
  token: string;
  pagoID: number;
  membresiaID: number;
  classesByDay: Record<Day, Class[]>;
};

export type Class = {
  active: boolean;
  hour: number;
  id: number;
  minute: number;
  name: string;
};

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
