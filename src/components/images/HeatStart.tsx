import React from 'react';
import classnames from 'classnames';
import { HeatFinsihInterface } from '../../interfaces/HeatFinsihInterface';
import { laneOrientation } from '../../types/LaneOrientation';
import { typelaneFinish } from '../../state/typelaneFinish';


export default class HeatNumbersLeft extends React.Component<HeatFinsihInterface, {}> {

    col_height: number = 40;
    image_width: number = 300;

    pixel_height: number = 720;
    pixel_width: number = 680;

    getNumberBox(lane: number, index: string, startpoint: number) {

        var svg_d = "M 0 0 h 35 l 0,35 h -35 z"

        if (this.props.orientation === laneOrientation.right) {
            svg_d = "M " + this.image_width + " " + startpoint + " h -35 l 0,35 h 35 z"
        } else {
            svg_d = "M 0 " + startpoint + " h 35 l 0,35 h -35 z"
        }

        return <path key={index}
            transform="scale(1)"
            d={svg_d}
            fill="url(#laneGradientStyle)"
        />
    }

    getNameBox(lane: number, index: string, startpoint: number) {

        var svg_d = "M 40 0 h 300 l 0,35 h -300 z"
        if (this.props.orientation === laneOrientation.right) {
            svg_d = "M " + (this.image_width - 40) + " " + startpoint + " h -300 l 0,35 h 300 z"
        } else {
            svg_d = "M 40 " + startpoint + " h 300 l 0,35 h -300 z"
        }

        return <path key={index}
            transform="scale(1)"
            d={svg_d}
            fill="url(#nameGradientStyle)"
        />
    }

    getStartPoint(lane: number) {
        var start = (lane - 1) * this.col_height
        if (this.props.reverseorder) {
            let height = this.col_height * this.props.lanes.length;
            var startpoint = height - start - this.col_height;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            var startpoint = (lane - 1) * this.col_height;
        }
        return startpoint
    }

    getNumberBoxes() {

        var box = <g id="layerbox1">
            {
                this.props.lanes.map((lane, index) => {
                    return this.getNumberBox(lane.lane, "idnumberbox" + index, this.getStartPoint(lane.lane))
                })
            }
        </g>;

        return box;
    }

    getNameBoxes() {

        var box = <g id="layernamebox1">
            {
                this.props.lanes.map((lane, index) => {
                    return this.getNameBox(lane.lane, "idname" + index, this.getStartPoint(lane.lane))
                })
            }
        </g>;

        return box;
    }

    getNameTextLeft(lane: number, index: string, name: string, startpoint: number) {
        let textlanesvg = classnames('textlanesvg');

        var textstart = startpoint + this.col_height - 14;

        return <g key={'gt' + index}>
            <text key={'t0' + index} className={textlanesvg}
                y={textstart} x="9"
                fontSize="27"
            >
                {lane}</text>
            <text key={'t1' + index} className={textlanesvg}
                y={textstart} x="50"
                fontSize="27"
            >
                {name}</text>
        </g>
    }

    getNameTextRight(lane: number, index: string, name: string, startpoint: number) {
        let textlanesvg = classnames('textlanesvg');
        var textstart = startpoint + this.col_height - 14;

        return <g key={'gt' + index}>
            <text key={'t0' + index} className={textlanesvg}
                y={textstart} x={this.image_width - 9}
                fontSize="27"
                text-anchor="end"
            >
                {lane}</text>
            <text key={'t1' + index} className={textlanesvg}
                y={textstart} x={this.image_width - 48}
                fontSize="27"
                text-anchor="end"
            >
                {name}</text>
        </g>
    }

    getDisplayName(lane: typelaneFinish) {
        let lastname = lane.swimmer.name !== undefined ? lane.swimmer.name : ''
        let firstname = lane.swimmer.firstName !== undefined ? lane.swimmer.firstName : ''

        if (this.props.orientation === laneOrientation.right) {
            return lastname + " " + firstname
        } else {
            return firstname + " " + lastname
        }
        
    }

    getAllText() {
        var box = <g id="layertext1">
            {
                this.props.lanes.map((lane, index) => {

                    if (this.props.orientation === laneOrientation.right) {
                        return this.getNameTextRight(lane.lane, "text" + index, this.getDisplayName(lane), this.getStartPoint(lane.lane))
                    } else {
                        return this.getNameTextLeft(lane.lane, "text" + index, this.getDisplayName(lane), this.getStartPoint(lane.lane))
                    }
                })
            }
        </g>;

        return box;
    }

    render() {

        let gradient_lane = classnames('gradient_lane');
        let gradient_name = classnames('gradient_name');
        let height = this.col_height * this.props.lanes.length;
        let viewBox = "0 0 " + this.image_width + " " + height;

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid meet"
            id="svg8"
            version="1.1"
            viewBox={viewBox}
            height={this.pixel_height}
            width={this.pixel_width}>
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
                    x2="465"
                    y1="0"
                    x1="0"
                    id="laneGradientStyle"
                    xlinkHref="#HeatNumbersGradient"
                />

                <linearGradient id="HeatNumaeGradient" gradientTransform="rotate(0)">
                    <stop
                        className={gradient_name}
                        offset="0"
                        stopOpacity="1"
                    />
                    <stop
                        className={gradient_name}
                        offset="1"
                        stopOpacity="0"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="0"
                    x2="300"
                    y1="0"
                    x1="0"
                    id="nameGradientStyle"
                    xlinkHref="#HeatNumaeGradient"
                />

            </defs>

            {this.getNumberBoxes()}
            {this.getNameBoxes()}
            {this.getAllText()}


        </svg>
        );
    }
}