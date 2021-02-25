import { eventHeat } from "../types/EventHeat";


export interface BaseFrontendInterface {
    startdelayms: number;
    EventHeat: eventHeat;
    lanes: any[];
    displayMode: string;
    runningTime: string;
    orientation: string;
}
