import { Response, Request, NextFunction } from "express";

import * as util from "../utils/index.util"
import * as eventService from '../services/event.service';
import * as workhourService from '../services/workhour.service';

import { findDateDto } from "../dtos/workhour.dto";
import { GetTimetableDto } from "../dtos/timeTable.dto";

import type { Timeslot } from '../interfaces/timeslot.interface';
import type { WorkDay } from "../interfaces/workhour.interface";

export const IndexController = {
    Index: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.sendStatus(200).send('Success');
        } catch (error) {
            next(error);
        }
    },
    Result: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodyTimetable: GetTimetableDto = req.body;

            // default parameters
            bodyTimetable.days = bodyTimetable.days ?? 1;
            bodyTimetable.is_ignore_schedule = bodyTimetable.is_ignore_schedule ?? false;
            bodyTimetable.is_ignore_workhour = bodyTimetable.is_ignore_workhour ?? false;
            bodyTimetable.timeslot_interval = bodyTimetable.timeslot_interval ?? 1800;

            //startDate 객체 생성
            let startDate: Date = new Date(util.getDateToString(bodyTimetable.start_day_identifier));
            startDate = bodyTimetable.timezone_identifier ? util.changeTimezone(startDate, bodyTimetable.timezone_identifier) : startDate;
            const findData: findDateDto = { start_date: startDate, days: bodyTimetable.days, is_ignore_workhour: bodyTimetable.is_ignore_workhour };

            //Workhour 
            const getWorkhourData: WorkDay[] = await workhourService.WorkhourService.findWorkhourByDate(findData);

            for (let i = 0; i < getWorkhourData.length; i++) {
                const data = getWorkhourData[i];
                const event = await eventService.EventService.findEventByDate(data.start_of_day, data.open_interval, data.close_interval);

                let start = 0;
                let end = 0;

                //is_ignore_workhour check
                if (bodyTimetable.is_ignore_workhour) {
                    start = data.start_of_day;
                    end = util.getTomorrow(data.start_of_day, 1);
                } else {
                    start = data.start_of_day + data.open_interval;
                    end = data.start_of_day + data.close_interval;
                }

                // Timeslot 생성
                let timeslots: Timeslot[];

                //is_ignore_schedule check
                if (bodyTimetable.is_ignore_schedule) {
                    timeslots = [{ begin_at: start, end_at: end }];
                } else {
                    timeslots = await eventService.EventService.findEventExceptTime(event, start, end);
                }

                timeslots = await eventService.EventService.getTimeSlot(timeslots, bodyTimetable.service_duration, bodyTimetable.timeslot_interval);
                getWorkhourData[i].timeslots = timeslots;
            }

            const DayTimetable = getWorkhourData.map(i => {
                const objTimetable = {
                    start_of_day: i.start_of_day,
                    day_modifier: i.day_modifier,
                    is_day_off: i.is_day_off,
                    timeslots: i.timeslots,
                };
                return objTimetable;
            });
            res.status(200).json({ data: DayTimetable, message: 'Success' });
        } catch (error) {
            next(error);
        }
    }
}
