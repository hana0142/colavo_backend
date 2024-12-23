export interface Workhour {
  close_interval?: number| undefined;
  is_day_off?: boolean| undefined;
  key?: string| undefined;
  open_interval?: number| undefined;
  weekday?: number| undefined;
}
export interface WorkDay {
  weekday: number| undefined;
  day_modifier: number| undefined;
  start_of_day: number| undefined;
  close_interval: number| undefined;
  is_day_off: boolean| undefined;
  key: string| undefined;
  open_interval: number| undefined;
  timeslots: Object[]| undefined;
}


