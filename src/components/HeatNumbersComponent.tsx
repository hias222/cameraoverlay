import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { Grid } from "@material-ui/core";
import HeatNumbers from "./images/HeatNumbers";
import { HeatDisplayState } from "../state/HeatDisplayState";
import { typelaneShow } from "../state/typelaneShow";

export class HeatNumbersComponent extends React.Component<BaseFrontendInterface, HeatDisplayState> {

    myLanes: typelaneShow[];

    constructor(props: BaseFrontendInterface) {
        super(props);
        this.myLanes = [
        ];

        this.state = {
            lanes: this.myLanes
        };


    }

    componentDidUpdate(prevProps: BaseFrontendInterface) {

        this.props.lanes.map((lane) => {
            var newLane = {lane: 1 ,  swimmer: '!'}
            return this.myLanes.push(newLane)
        })

        this.setState({
            lanes: this.myLanes
        })

        console.log("updtae ----------------- ")
    }

    render() {
        return (
            <Grid container >
                <HeatNumbers
                    lanes={this.state.lanes}
                />
            </Grid>
        )
    }
}
