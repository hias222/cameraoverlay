import { typelaneFinish } from "../state/typelaneFinish";
import {laneOrientation } from "../types/LaneOrientation";
export interface HeatFinsihInterface {
    lanes: typelaneFinish[];
    orientation: laneOrientation;
    reverseorder: boolean;
    laneNumbers: number;
}
