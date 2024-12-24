
import type { Workhour } from '../interfaces/workhour.interface'

import { findDateDto } from '../dtos/workhour.dto';
import { getWeekToArray } from '../utils/index.util';
import { HttpException } from '../middlewares/httpException.middleware';

import WorkhourModel from '../models/workhour.model'

/** workhour 관련 service 모듈듈 */
export const WorkhourService = {

  /**
  * @method selectAllWorkhour
  * @returns {Workhour} workhourResul\
  * @description find all workhour data
  */
  findAllWorkhour: async (): Promise<Workhour[]> => {
    let workhours = WorkhourModel;
    const workhourResult: Workhour[] = workhours;
    return workhourResult;
  },

  /**
 * @method findWorkhourByDate
 * @param {findDateDto} findData
 * @returns {Array} arrWeekresult
 * @description find workhour include date
 */
  findWorkhourByDate: async (findData: findDateDto) => {
    let workhours = WorkhourModel;
    const arrWeek = getWeekToArray(findData.start_date, findData.days);

    const weekNumAry = arrWeek.map(i => i.weekday);
    const findWorkhours = workhours.filter(
      workhour => weekNumAry.includes(workhour.weekday) && (findData.is_ignore_workhour ? true : !workhour.is_day_off),
    );

    if (!findWorkhours) throw new HttpException(409, "workhours doesn't exist");

    const arrWeekresult = arrWeek.map(item => {
      const a = findWorkhours.find(workhour => item.weekday === workhour.weekday);
      return { ...item, ...a };
    });
    
    return arrWeekresult;
  }
}
