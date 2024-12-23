import {Workhour} from '../interfaces/workhour.interface';
import WorkhourModel from '../models/workhours.json';
import {Event} from '../interfaces/event.interface';
import EventModel from '../models/events.json';
// const workhourData: Workhour[] = WorkhourModel;

// export default workhourData;

export const JsonLoad = {
    loadWorkhourData: async()=>{
        const workhourData: Workhour[] = WorkhourModel;
        return workhourData;
    },
    loadEventData: async()=>{
        const eventData: Event[] = EventModel;
        return eventData;
    }
}