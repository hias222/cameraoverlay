import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";

import { HeatDisplayState } from "../state/HeatDisplayState";
import { typelaneShow } from "../state/typelaneShow";
import classnames from "classnames";
import HeatNumbersLeft from "./images/HeatNumbersLeft";

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
        this.checkUpdate = this.checkUpdate.bind(this)

    }

    componentDidMount() {
        this.checkUpdate()
        console.log("orientation " + this.props.orientation)
    }

    componentDidUpdate(prevProps: BaseFrontendInterface) {
        this.checkUpdate()
    }

    checkUpdate() {
        this.props.lanes.map((lane, index) => {
            var size = this.myLanes.length;
            var newLane = {
                lane: 0, lanename: lane.lane, swimmer:
                {
                    name: lane.lastname,
                    firstName: lane.firstname,
                    clubid: lane.code,
                    clubname: lane.name
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
                    firstName: lane.firstname,
                    clubid: lane.code,
                    clubname: lane.name
                }
            }
            if (this.myLanes[index].lane !== newLane.lane) {
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

        let inner = classnames('inner');
        return (
            <div className={inner}    >       
                <HeatNumbersLeft
                    lanes={this.state.lanes}
                />
                </div>
        )
    }
}
