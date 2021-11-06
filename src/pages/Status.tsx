import React from 'react';
import '../styles/App.scss';
import { WsSocketState } from '../services/WsSocketState';
import { FrontendState } from '../state/FrontendState';

import { eventHeat } from '../types/EventHeat';

import classnames from 'classnames';
import { PropsType } from '../types/PropsType';
import { StatusComponent } from '../components/StatusComponent';

export default class status extends React.Component<PropsType, FrontendState> {

    mylane: any[];
    correctValueForLaneNull: number;
    evenHeat: eventHeat;

    constructor(props: PropsType) {
        super(props);
        this.onStartStop = this.onStartStop.bind(this);
        this.onEventHeatChange = this.onEventHeatChange.bind(this);
        this.onLaneChange = this.onLaneChange.bind(this);
        this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onRunningTimeChange = this.onRunningTimeChange.bind(this);
  
        this.evenHeat = {
            name: "new",
            heatnr: "0",
            eventnr: "0"
        }


        this.state = {
            startdelayms: 0,
            runningTime: "",
            racerunning: false,
            eventHeat: this.evenHeat,
            lanes: [],
            displayMode: "race",
            MessageText: "",
            MessageTime: Date.now().toString(),
            VideoVersion: "",
            orientation: "",
            racestate: "",
            reverseorder: true
        };
        this.mylane = [];
        this.correctValueForLaneNull = 0;

    }
    async onStartStop(startdelayms: number) {
        console.log("App: start or stop event (" + startdelayms + ")");
        // start without stop
        if (startdelayms !== -1) {
            if (this.state.racerunning) {
                this.setState({
                    startdelayms: 0,
                    racerunning: false
                });
            }
        }
        this.setState({
            startdelayms: startdelayms,
            racerunning: true
        });
    }

    onEventHeatChange(EventHeat: eventHeat) {
        console.log('new Heat ' + EventHeat.heatnr)
        this.setState({
            eventHeat: EventHeat,
            lanes: [],
        });
    }


    onDisplayModeChange(displaymode: string) {
        console.log("change to " + displaymode)
        this.setState({
            displayMode: displaymode
        })
    }

    onLaneChange(lane: number, LaneData: any) {
    }

    onMessageChange(message: any) {}

    onRunningTimeChange(RunningTime: string) {
        this.setState({
            runningTime: RunningTime
        });
    }

    getStateComponent() {
            return <StatusComponent
                startdelayms={this.state.startdelayms}
                EventHeat={this.state.eventHeat}
                displayMode={this.state.displayMode}
                runningTime={this.state.runningTime} 
                mode={this.state.displayMode}            />
    }

    render() {

        let statusclass = classnames('statusclass');

        return (
            <div className={statusclass} >
                <WsSocketState onStartStop={this.onStartStop}
                    onEventHeatChange={this.onEventHeatChange}
                    onLaneChange={this.onLaneChange}
                    onDisplayModeChange={this.onDisplayModeChange}
                    onRunningTimeChange={this.onRunningTimeChange}
                    onMessageChange={this.onMessageChange} />
                {this.getStateComponent()}
            </div>
        );
    }
}
