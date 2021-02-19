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

        this.addLaneData = this.addLaneData.bind(this)
    }

    componentDidUpdate(prevProps: BaseFrontendInterface) {

        this.props.lanes.map((lane, index) => {
            var size = this.myLanes.length;
            var newLane = {
                lane: 1, lanename: lane.lane, swimmer:
                {
                    name: lane.lastname,
                    clubid: 'ssssd',
                    clubname: 'sdfas'
                }
            }
            if (index > size - 1) {
                this.myLanes.push(newLane)
                this.setState({
                    lanes: this.myLanes
                })
                return null
            } else {
                this.addLaneData(lane, index)
                    .then((changed) => {
                        if (changed) {
                            this.setState({
                                lanes: this.myLanes
                            })
                        }
                    })
                return null
            }
        })
    }

    addLaneData(lane: any, index: number): Promise<boolean> {
        return new Promise((resolve) => {
            var changed = false
            var lanenumber = parseInt(lane.lane)
            var newLane = {
                lane: lanenumber, lanename: lane.lane, swimmer:
                {
                    name: lane.lastname,
                    clubid: 'ssssd',
                    clubname: 'sdfas'
                }
            }
            if (this.myLanes[index].lane !== newLane.lane) {
                //console.log('update lane ' + lanenumber )
                //console.log(newLane )

                this.myLanes[index] = newLane
                changed = true
            } else {
                if (newLane.swimmer !== undefined) {
                    //console.log(newLane.swimmer)
                    if (this.myLanes[index].swimmer.name !== newLane.swimmer.name) {
                        console.log('update swimmer ' + lanenumber)
                        this.myLanes[index] = newLane
                    }
                }
            }

            resolve(changed)
        })
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
