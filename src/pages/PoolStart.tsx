import React from 'react';
import '../styles/App.scss';
import { WsSocketState } from '../services/WsSocketState';
import { FrontendState } from '../state/FrontendState';

import { eventHeat } from '../types/EventHeat';

import classnames from 'classnames';
import { HeatFinishComponent } from '../components/HeatFinishComponent';
import { PropsType } from '../types/PropsType';

var S_NUMBER_OF_LANES: string = process.env.REACT_APP_NUMBER_OF_LANES === undefined ? "8" : process.env.REACT_APP_NUMBER_OF_LANES
var NUMBER_OF_LANES: number = parseInt(S_NUMBER_OF_LANES)

var FIRST_LANE_ORDER: string = process.env.REACT_APP_FIRST_LANE_ORDER === undefined ? "TOP_DOWN" : process.env.REACT_APP_FIRST_LANE_ORDER
var S_FIRST_LANE_NUMBER: string = process.env.REACT_APP_FIRST_LANE_NUMBER === undefined ? "1" : process.env.REACT_APP_FIRST_LANE_NUMBER
var FIRST_LANE_NUMBER: number = parseInt(S_FIRST_LANE_NUMBER)

export default class PoolStart extends React.Component<PropsType, FrontendState> {

    mylane: any[];
    correctValueForLaneNull: number;
    evenHeat: eventHeat;
    orientation: string;
    racestate: string;
    numberLanes: number;

    constructor(props: PropsType) {
        super(props);
        this.onStartStop = this.onStartStop.bind(this);
        this.onEventHeatChange = this.onEventHeatChange.bind(this);
        this.onLaneChange = this.onLaneChange.bind(this);
        this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onRunningTimeChange = this.onRunningTimeChange.bind(this);

        this.orientation = this.props.match.params.orientation;
        this.racestate = this.props.match.params.racestate;
        this.numberLanes = NUMBER_OF_LANES
   
        this.evenHeat = {
            name: "new",
            heatnr: "0",
            eventnr: "0"
        }

        var boolorientation = FIRST_LANE_ORDER === 'TOP_DOWN' ? false : true;

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
            reverseorder: boolorientation
        };
        this.mylane = [];
        this.correctValueForLaneNull = 0;

        for (var i = 0; i < NUMBER_OF_LANES; i++) {
            this.mylane.push({
                "type": "lane",
                "lane": i + 1,
                "event": "1",
                "place": undefined,
                "finishtime": undefined,
                "heat": "1",
                "lap": "false"
            });
        }

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
                console.log(LaneData)
                this.mylane.push(LaneData)
            } else {
                this.mylane[lane - 1 + this.correctValueForLaneNull] = (LaneData)
                //console.log(lane + ": change (" + this.correctValueForLaneNull + ")" + lane + ' ' + LaneData.lane)
                //console.log(LaneData)
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

    componentDidMount() {
        this.setState({
            orientation: this.orientation
        })

        console.log('state is ' + this.racestate + ' and  orientation ' + this.orientation + ' ' + NUMBER_OF_LANES)
        console.log('Number first lane is ' + FIRST_LANE_NUMBER)
        console.log('Order is ' + FIRST_LANE_ORDER)

    }

    getStateComponent() {
            return <HeatFinishComponent
                startdelayms={this.state.startdelayms}
                EventHeat={this.state.eventHeat}
                lanes={this.state.lanes}
                numberLanes={this.numberLanes}
                displayMode={this.state.displayMode}
                runningTime={this.state.runningTime}
                orientation={this.state.orientation}
                reverseorder={this.state.reverseorder}
                mode={this.racestate}
            />
    }

    render() {

        let base = classnames('base');

        return (
            <div className={base} >
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
