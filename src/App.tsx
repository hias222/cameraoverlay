import React from 'react';
import './styles/App.scss';
import { WsSocketState } from './services/WsSocketState';
import { FrontendState } from './state/FrontendState';

import { eventHeat } from './types/EventHeat';
import { Box } from "@material-ui/core";

import classnames from 'classnames';
import { HeatNumbersComponent } from './components/HeatNumbersComponent';

export default class Lcd extends React.Component<{}, FrontendState> {

    mylane: any[];
    correctValueForLaneNull: number;
    evenHeat: eventHeat;

    constructor(props: {}) {
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
            VideoVersion: ""
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
        this.setState({
            eventHeat: EventHeat
        });
    }


    onRunningTimeChange(RunningTime: string) {
        this.setState({
            runningTime: RunningTime
        });
    }

    onLaneChange(lane: number, LaneData: any) {
        if (lane === -1) {
            console.log("+++++ clear all")
            this.correctValueForLaneNull = 0;
            this.setState({
                lanes: this.mylane = []
            })
        } else {

            // eslint-disable-next-line
            if (lane == 0 && this.correctValueForLaneNull != 1) {
                console.log("+++++ 0")
                this.correctValueForLaneNull = 1;
            }
            var sizeLanes = this.mylane.length - this.correctValueForLaneNull

            if (lane > sizeLanes) {
                console.log(lane + ": new (" + this.correctValueForLaneNull + ")")
                this.mylane.push(LaneData)
            } else {
                this.mylane[lane - 1 + this.correctValueForLaneNull] = (LaneData)
                console.log(lane + ": change (" + this.correctValueForLaneNull + ")")
            }

            this.setState({
                lanes: this.mylane
            })
        }
    }

    onDisplayModeChange(displaymode: string) {
        console.log("change to " + displaymode)
        this.setState({
            displayMode: displaymode
        })
    }

    onMessageChange(message: any) {

        if (message.version !== undefined) {
            this.setState({
                VideoVersion: message.version
            })
        }

        if (message.value !== undefined) {
            this.setState({
                MessageText: message.value
            })
        }

        if (message.time !== undefined) {
            this.setState({
                MessageTime: message.time
            })
        } else {
            this.setState({
                MessageTime: Date.now().toString()
            })
        }

    }


    render() {

        let inner = classnames('inner');

        return (
            <div  >
                <Box className={inner} height={500}>
                    <WsSocketState onStartStop={this.onStartStop}
                        onEventHeatChange={this.onEventHeatChange}
                        onLaneChange={this.onLaneChange}
                        onDisplayModeChange={this.onDisplayModeChange}
                        onRunningTimeChange={this.onRunningTimeChange}
                        onMessageChange={this.onMessageChange} />
                    <HeatNumbersComponent
                        startdelayms={this.state.startdelayms}
                        EventHeat={this.state.eventHeat}
                        lanes={this.state.lanes}
                        displayMode={this.state.displayMode}
                        runningTime={this.state.runningTime}
                    />
                </Box>
            </div>
        );
    }
}
