export interface Timeslot {
  begin_at: number; // required
  end_at: number;
}

export interface DayTimetable {
  start_of_day?: number| undefined; // Unixstamp seconds
  day_modifier?: number| undefined;
  is_day_off?: boolean| undefined;
  timeslots?: Timeslot[]| undefined;
}
