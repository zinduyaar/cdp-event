import { NextFunction, Request, Response } from "express"

export class EventController {


    async createEvent(request: Request, response: Response, next: NextFunction) {
        console.log('is it even working')
        return 'Event created'

    }

}