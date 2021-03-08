import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";

import { HeatDisplayState } from "../state/HeatDisplayState";
import { typelaneFinish } from "../state/typelaneFinish";
import HeatNumbersLeft from "./images/HeatNumbersLeft";
import HeatNumbersRight from "./images/HeatNumbersRight";

export class HeatFinishComponent extends React.Component<BaseFrontendInterface, HeatDisplayState> {

    myLanes: typelaneFinish[];

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
        console.log("finish orientation " + this.props.orientation)
    }

    componentDidUpdate(prevProps: BaseFrontendInterface) {
        this.checkUpdate()
    }

    checkUpdate() {
        this.props.lanes.map((lane, index) => {
            var size = this.myLanes.length;
            var lanenumber = parseInt(lane.lane)
            var newLane: typelaneFinish = {
                lane: lanenumber, lanename: lane.lane,
                place: lane.place,
                finishtime: lane.finishtime,
                swimmer:
                {
                    name: lane.lastname,
                    firstName: lane.firstname,
                    clubid: lane.code,
                    clubname: lane.name
                }
            }
            this.checkIndexSize(newLane, index, size)
                .then(() =>
                    this.checkFinishTime(lane))
                .then(() =>
                    this.addLaneData(newLane, index))
                .then(() => {
                    this.setState({
                        lanes: this.myLanes
                    })
                })
                .catch((error) => console.log(error))
            return null
        })
    }

    checkIndexSize(newLane: typelaneFinish, index: number, size: number): Promise<any> {
        console.log('checkIndexSize')
        return new Promise((resolve, reject) => {
            if (index > size - 1) {
                this.myLanes.push(newLane)
                return resolve('change')
            } else {
                return resolve('nochange')
            }
        })
    }

    checkFinishTime(lane: any): Promise<any> {
        return new Promise((resolve, reject) => {
            //console.log(lane.finishtime)
            if (lane.finishtime !== undefined && lane.place !== undefined) {
                //console.log(lane)
                if (lane.finishtime !== 'undefined') {
                    console.log('finish ------------')
                    console.log(lane)
                    return resolve('success')
                } else {
                    return reject('checkFinishTime')
                }
            } else {
                return reject('checkFinishTime')
            }
        })
    }

    addLaneData(newLane: typelaneFinish, index: number): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('addlane')
            //var lanenumber = parseInt(lane.lane)
            if (this.myLanes[index].lane !== newLane.lane) {
                this.myLanes[index] = newLane
                return resolve('success')
            } else {
                if (newLane.swimmer !== undefined) {
                    //console.log(newLane.swimmer)
                    if (this.myLanes[index].swimmer.name !== newLane.swimmer.name) {
                        console.log('update swimmer ' + newLane.lane)
                        this.myLanes[index] = newLane
                        return resolve('success')
                    } else {
                        return reject('addLaneData')
                    }
                } else {
                    return reject('addLaneData')
                }
            }
        })
    }

    getPoolSite() {

        if (this.props.orientation === 'left') {
            return <HeatNumbersLeft
                lanes={this.state.lanes}
            />

        }

        if (this.props.orientation === 'right') {
            return <HeatNumbersRight
                lanes={this.state.lanes}
            />

        }

        return <h2>Nothing</h2>

    }

    render() {

        return (
            this.getPoolSite()
        )
    }
}
