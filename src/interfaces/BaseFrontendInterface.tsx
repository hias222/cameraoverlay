import { eventHeat } from "../types/EventHeat";
import { LaneData } from "./lanedatainterface";

export interface BaseFrontendInterface {
    startdelayms: number;
    EventHeat: eventHeat;
    lanes: LaneData[];
    displayMode: string;
    runningTime: string;
}
