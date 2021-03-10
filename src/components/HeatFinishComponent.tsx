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
            //console.log(this.props)
            //console.log(this.state)
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
                .then(() =>
                    this.checkFinishTime(lane))
                .then(() => {
                    return this.addLaneData(newLane, index)
                })
                .then((data) => {
                    console.log('------------')
                    console.log(data)
                    this.setState({
                        lanes: this.myLanes
                    })
                })
                .catch((error) => {
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
            //return resolve('test')
            //console.log(newLane)
            // TODO: only name insert
            if (laneWithoutTime.swimmer.name !== undefined && this.myLanes[index].swimmer !== undefined) {
                if (this.myLanes[index].swimmer.name !== laneWithoutTime.swimmer.name) {
                    this.myLanes[index] = laneWithoutTime
                   
                    return resolve('success rename lane ' + laneWithoutTime.lane + ' ev ' + this.props.EventHeat.eventnr + ' ' + this.props.EventHeat.heatnr)
                } else {
                    return resolve('nothing to do ')
                }
            } else {
                //this.myLanes[index] = emptyLane
                return resolve('checkNameChangeAfterHeatChange')
               //return reject('checkNameChangeAfterHeatChange')
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

        if (this.props.orientation === 'left') {
            //console.log(this.state.lanes)
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
