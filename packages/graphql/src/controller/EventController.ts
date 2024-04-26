import { NextFunction, Request, Response } from "express"

export class EventController {


    async createEvent(request: Request, response: Response, next: NextFunction) {
        return 'Event created'
    }

}