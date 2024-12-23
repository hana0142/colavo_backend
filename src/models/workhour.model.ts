
import { Workhour } from '../interfaces/workhour.interface';

const workhourModel: Workhour[] = [
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'fri',
    open_interval: 36000,
    weekday: 6,
  },
  {
    close_interval: 36900,
    is_day_off: false,
    key: 'mon',
    open_interval: 36900,
    weekday: 2,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'sat',
    open_interval: 36000,
    weekday: 7,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'sun',
    open_interval: 36000,
    weekday: 1,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'thu',
    open_interval: 36000,
    weekday: 5,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'tue',
    open_interval: 36000,
    weekday: 3,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'wed',
    open_interval: 36000,
    weekday: 4,
  },
];

export default workhourModel;
