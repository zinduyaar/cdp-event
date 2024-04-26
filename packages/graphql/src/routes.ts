import { EventController } from "./controller/EventController"

export const Routes = [{
    method: "get",
    route: "/menu",
    controller: EventController,
    action: "all"
}]