import React from 'react';
import classnames from 'classnames';
import { HeatDisplayInterface } from '../../interfaces/HeatDisplayInterface';


export default class HeatNumbers extends React.Component<HeatDisplayInterface, {}> {

    col_height: number = 40;

    getBox(lane: number) {

        var startpoint = (lane - 1) * this.col_height
        var svg_d = "M 0 " + startpoint + " h 60 l -30,35 h -30 z"
        console.log(svg_d + " - " + this.props.lanes.length)
        return <path
            transform="scale(1)"
            //d="M 0 3 h 60 l -30,35 h -30  z"
            d={svg_d}
            fill="url(#laneGradientStyle)"
        />
    }

    getBoxes() {

        var box = <g>
            {
                this.props.lanes.map((lane, index) => {
                    return this.getBox(lane.lane)
                })
            }
        </g>;

        return box;
    }

    getText(lane: number) {
        let textlanesvg = classnames('textlanesvg');

        var startpoint = (lane ) * this.col_height - 12 

        return <text
            className={textlanesvg}
            y={startpoint}
            x="3"
            fontSize="27"
        >
            {lane}</text>
    }

    getAllText() {
        var box = <g>
            {
                this.props.lanes.map((lane, index) => {
                    return this.getText(lane.lane)
                })
            }
        </g>;

        return box;
    }

    render() {

        let gradient_lane = classnames('gradient_lane');
        let height = this.col_height * this.props.lanes.length;
        let viewBox = "0 0 60 " + height;

        return (<svg
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            id="svg8"
            version="1.1"
            viewBox={viewBox}
            height={height}
            width="60">
            <defs>
                <linearGradient id="HeatNumbersGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_lane}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={gradient_lane}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="0"
                    x2="65"
                    y1="0"
                    x1="0"
                    id="laneGradientStyle"
                    xlinkHref="#HeatNumbersGradient"
                />
            </defs>
            <g
                id="layer1">
                {this.getBoxes()}
                {this.getAllText()}
            </g>
        </svg>
        );
    }
} 