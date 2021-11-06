import { RouteComponentProps } from "react-router-dom";

type PathParamsType = {
    orientation: string,
    racestate: string,
}

export type PropsType = RouteComponentProps<PathParamsType> 