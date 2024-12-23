import type { Event } from "../interfaces/event.interface";
import type { Timeslot } from "../interfaces/timeslot.interface";

import { HttpException } from '../middlewares/httpException.middleware';

import EventModel from '../models/event.model';

//Event Service
export const EventService = {
    findEventByDate: async (start_of_day: number, open_interval: number, close_interval: number): Promise<Event[]> => {
        //event data load
        let eventData = EventModel;
        const findEvents: Event[] = eventData.filter(
            event => event.begin_at > start_of_day + open_interval && event.end_at < start_of_day + close_interval,
        );

        if (!findEvents) throw new HttpException(409, "Event doesn't exist");
        return findEvents;
    },

    checkEvent: async (events: Event[]) => {
        events.forEach((item, idx, arrEvent) => {
            if (item.begin_at > item.end_at) {
                const tmp = item.begin_at;
                arrEvent[idx].begin_at = item.end_at;
                arrEvent[idx].end_at = tmp;
            }
        });

        return events;
    },

    findEventExceptTime: async (events: Timeslot[], start: number, end: number) => {
        const eventData = await EventService.checkEvent(events);
        const arrEvent: Event[] = [];
        let tmpStart = start;
        
        eventData.map(item => {
            if (item.begin_at === item.end_at) {
            } else if (item.begin_at >= tmpStart && item.end_at <= end) {
                arrEvent.push({ begin_at: tmpStart, end_at: item.begin_at });
                tmpStart = item.end_at;
            }
        });

        if (tmpStart <= end) {
            arrEvent.push({ begin_at: tmpStart, end_at: end });
        }

        return arrEvent;
    },

    getTimeSlot: async (timeslots: Timeslot[], service_duration: number, timeslot_interval: number) => {
        const arrTimeslot: Timeslot[] = [];

        timeslots.forEach(item => {
            const beginTime = item.begin_at;
            const endTime = item.end_at;
            let tmp_begin = beginTime;

            while (tmp_begin < endTime) {
                const service_end = (Number)(tmp_begin) + (Number)(service_duration);
                const timeslot_end = (Number)(tmp_begin) + (Number)(timeslot_interval);

                if ((service_end <= endTime) && (timeslot_end <= endTime)) {
                    arrTimeslot.push({ begin_at: tmp_begin, end_at: service_end });
                    tmp_begin = timeslot_end;
                } else {
                    console.log('end')
                    break;
                }
            }
        });
        return arrTimeslot;
    }
}
