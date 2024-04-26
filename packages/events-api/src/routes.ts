import { EventController } from "./controller/EventController"

export const Routes = [{
    method: "post",
    route: "/event/create",
    controller: EventController,
    action: "createEvent"
}]