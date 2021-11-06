import React from "react";
import { BaseFrontendInterface } from "../interfaces/BaseFrontendInterface";
import { HeatFinishState } from "../state/HeatFinishState";
import { typelaneFinish } from "../state/typelaneFinish";
import HeatFinish from "./images/HeatFinish";
import HeatStart from "./images/HeatStart";
import { laneOrientation } from "../types/LaneOrientation";

export class HeatFinishComponent extends React.Component<BaseFrontendInterface, HeatFinishState> {

    myLanes: typelaneFinish[];

    constructor(props: BaseFrontendInterface) {
        super(props);
        this.myLanes = [];

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
        if (this.props.EventHeat.heatnr !== prevProps.EventHeat.heatnr || this.props.EventHeat.eventnr !== prevProps.EventHeat.eventnr) {
            // TODO: clear all
            this.myLanes = [];
            console.log('clear finish')
            this.setState({
                lanes: []
            })
        } else {
            this.checkUpdate()
        }
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

            this.checkIndexSize(index, size)
                .then(() =>
                    this.checkNameChangeAfterHeatChange(lane, index))
                .then(() => // wenn erfolgreich start aktualisieren
                    this.checkFinishTime(lane))
                .then(() => {
                    return this.addLaneData(newLane, index)
                })
                .then((data) => {
                    this.setState({
                        lanes: this.myLanes
                    })
                })
                .catch((error) => {
                    // if start always show 
                    //console.log('debug: ' + error)
                })

            return null
        })
    }

    checkIndexSize(index: number, size: number): Promise<any> {
        //console.log('checkIndexSize')
        // lanename - start form null?
        // TODO: start from 0
        var lanename = index + 1;
        var emptyLane: typelaneFinish = {
            lane: index + 1, lanename: lanename + '',
            place: "undefined",
            finishtime: "undefined",
            swimmer:
            {
                name: "",
                firstName: "",
                clubid: "",
                clubname: ""
            }
        }

        return new Promise((resolve, reject) => {
            if (index > size - 1) {
                console.log('push ' + index + ' ' + emptyLane.lane)
                // console.log(emptyLane)
                this.myLanes.push(emptyLane)
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
                        return reject('checkFinishTime no time lane place 0 ' + lane.lane)
                    }
                } else {
                    return reject('checkFinishTime no time lane string undefined ' + lane.lane)
                }
            } else {
                return reject('checkFinishTime no time lane undefined' + lane.lane)
            }
        })
    }


    checkNameChangeAfterHeatChange(lane: any, index: number): Promise<any> {

        var lanenumber = parseInt(lane.lane)
        var laneWithoutTime: typelaneFinish = {
            lane: lanenumber, lanename: lane.lane,
            place: 'undefined',
            finishtime: 'undefined',
            swimmer:
            {
                name: lane.lastname,
                firstName: lane.firstname,
                clubid: lane.code,
                clubname: lane.name
            }
        }

        return new Promise((resolve, reject) => {

            if (laneWithoutTime.swimmer.name !== undefined && this.myLanes[index].swimmer !== undefined) {
                if (this.myLanes[index].swimmer.name !== laneWithoutTime.swimmer.name) {
                    this.myLanes[index] = laneWithoutTime
                    this.setState({
                        lanes: this.myLanes
                    })
                    return resolve('success rename lane ' + laneWithoutTime.lane + ' ev ' + this.props.EventHeat.eventnr + ' ' + this.props.EventHeat.heatnr)
                } else {
                    return resolve('nothing to do ')
                }
            } else {
                return resolve('checkNameChangeAfterHeatChange')
            }

        })
    }

    addLaneData(newLane: typelaneFinish, index: number): Promise<any> {
        return new Promise((resolve, reject) => {
            // console.log('addlane ' + this.myLanes[index].finishtime + ' ' + newLane.finishtime)
            if (this.myLanes[index].finishtime !== newLane.finishtime) {
                this.myLanes[index] = newLane
                return resolve('success lane ' + newLane.lane + ' ev ' + this.props.EventHeat.eventnr + ' ' + this.props.EventHeat.heatnr + ' ' + newLane.swimmer.name)
            } else {
                return reject('addLaneData no change in finish time ' + newLane.lane)
            }

        })
    }

    getPoolSite() {
        console.log(this.props.mode + ' ' + this.props.orientation)

        if (this.props.mode === 'start') {
            if (this.props.orientation === 'left') {
                return <HeatStart
                    lanes={this.state.lanes}
                    reverseorder={this.props.reverseorder}
                    orientation={laneOrientation.left}
                    laneNumbers={this.props.numberLanes}
                />

            }

            if (this.props.orientation === 'right') {
                return <HeatStart
                    lanes={this.state.lanes}
                    reverseorder={this.props.reverseorder}
                    orientation={laneOrientation.right}
                    laneNumbers={this.props.numberLanes}
                />

            }
        } else if (this.props.mode === 'finish') {
            if (this.props.orientation === 'left') {
                return <HeatFinish
                    lanes={this.state.lanes}
                    reverseorder={this.props.reverseorder}
                    orientation={laneOrientation.left}
                    laneNumbers={this.props.numberLanes}
                />
            }

            if (this.props.orientation === 'right') {
                return <HeatFinish
                    lanes={this.state.lanes}
                    reverseorder={this.props.reverseorder}
                    orientation={laneOrientation.right}
                    laneNumbers={this.props.numberLanes}
                />
            }
        } else {

        }

        return <h2>Nothing</h2>
    }

    render() {
        return (
            this.getPoolSite()
        )
    }
}
