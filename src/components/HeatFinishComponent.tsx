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
                .catch((error) => console.log('debug: ' + error))
            return null
        })
    }

    checkIndexSize(newLane: typelaneFinish, index: number, size: number): Promise<any> {
        //console.log('checkIndexSize')
        return new Promise((resolve, reject) => {
            if (index > size - 1) {
                this.myLanes.push(newLane)
                this.setState({
                    lanes: this.myLanes
                })
                return resolve('change')
            } else {
                return resolve('nochange')
            }
        })
    }

    checkFinishTime(lane: typelaneFinish): Promise<any> {
        return new Promise((resolve, reject) => {
            if (lane.finishtime !== undefined && lane.place !== undefined) {
                if (lane.finishtime !== 'undefined' && lane.place !== 'undefined') {
                    if (lane.place !== '0') {
                        return resolve('success')
                    } else {
                        return reject('checkFinishTime')
                    }
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
            // console.log('addlane ' + this.myLanes[index].finishtime + ' ' + newLane.finishtime)
            if (this.myLanes[index].finishtime !== newLane.finishtime) {
                console.log('update swimmer ' + newLane.lane)
                this.myLanes[index] = newLane
                return resolve('success')
            } else {
                return reject('addLaneData')
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
