import React from "react";
import { HeatFinishState } from "../state/HeatFinishState";
import { typelaneFinish } from "../state/typelaneFinish";
import { StatusInterface } from "../interfaces/StatusInterface";
import classnames from "classnames";
import { Box } from "@material-ui/core";
import BoxEmpty from "./images/BoxEmpty";
import EventName from "./images/EventName";

export class StatusComponent extends React.Component<StatusInterface, HeatFinishState> {

    myLanes: typelaneFinish[];

    constructor(props: StatusInterface) {
        super(props);
        this.myLanes = [];

        this.state = {
            lanes: this.myLanes
        };

        this.checkUpdate = this.checkUpdate.bind(this)

    }

    componentDidMount() {
        this.checkUpdate()
    }

    componentDidUpdate(prevProps: StatusInterface) {
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
        return null
    }

    getPoolSite() {
        
        return <h2> Event {this.props.EventHeat.eventnr} Heat {this.props.EventHeat.heatnr} </h2>
    }

    render() {

        let noSpaceContainerHorizontal = classnames('noSpaceContainerHorizontal');

        return (
            <div className={noSpaceContainerHorizontal}>
            <BoxEmpty 
                boxSizeHeight={100}
                boxSizeWidth={900}/>
            <EventName
            EventName={this.props.EventHeat.eventnr}
            HeatName={this.props.EventHeat.heatnr}
            />
        </div >
        )
    }
}
