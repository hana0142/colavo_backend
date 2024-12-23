import Router from 'express';

import { GetTimetableDto } from '../dtos/timeTable.dto';
import { IndexController } from '../controllers/index.controller';
import { Routes } from '../interfaces/route.interface';
import validationMiddleware from '../middlewares/validate.middleware';

class IndexRoute implements Routes {
    public path = '/';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, IndexController.Index);
        this.router.post(`${this.path}getTimeSlots`, validationMiddleware(GetTimetableDto, 'body'), IndexController.Result);
    }
}

export default IndexRoute;