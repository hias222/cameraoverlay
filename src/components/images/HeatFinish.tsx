import React from 'react';
import classnames from 'classnames';
import { HeatFinsihInterface } from '../../interfaces/HeatFinsihInterface';
import { laneOrientation } from '../../types/LaneOrientation';
import { typelaneFinish } from '../../state/typelaneFinish';


export default class HeatFinish extends React.Component<HeatFinsihInterface, {}> {

    col_height: number = 40;
    // let height = this.col_height * this.props.lanes.length;
    image_width: number = 300;

    pixel_height: number = 720;
    pixel_width: number = 680;

    pixel_text_length: number = 1000;

    print_box_height = this.col_height - 5;
    text_height = this.print_box_height -8 ;
    start_name = this.col_height + 10;
    start_place = 9;

    getNumberBox(lane: number, index: string, startpoint: number) {

        var svg_d = "M 0 0 h " + this.print_box_height + " l 0," + this.print_box_height + " h -" + this.print_box_height + " z"

        if (this.props.orientation === laneOrientation.right) {
            svg_d = "M " + this.image_width + " " + startpoint + " h -" + this.print_box_height + " l 0," + this.print_box_height + " h " + this.print_box_height + " z"
        } else {
            svg_d = "M 0 " + startpoint + " h " + this.print_box_height + " l 0," + this.print_box_height + " h -" + this.print_box_height + " z"
        }

        return <path key={index}
            transform="scale(1)"
            d={svg_d}
            fill="url(#laneGradientStyle)"
        />
    }

    getNameBox(lane: number, index: string, startpoint: number) {

        var svg_d = "M " + this.col_height + " 0 h " + this.pixel_text_length + " l 0," + this.print_box_height + " h -" + this.pixel_text_length + " z"
        if (this.props.orientation === laneOrientation.right) {
            svg_d = "M " + (this.image_width - this.col_height) + " " + startpoint + " h -" + this.pixel_text_length + " l 0," + this.print_box_height + " h " + this.pixel_text_length + " z"
        } else {
            svg_d = "M " + this.col_height + " " + startpoint + " h " + this.pixel_text_length + " l 0," + this.print_box_height + " h -" + this.pixel_text_length + " z"
        }

        return <path key={index}
            transform="scale(1)"
            d={svg_d}
            fill="url(#nameGradientStyle)"
        />
    }

    getFinishText(lane: typelaneFinish) {
        var displayText: string
        var lastname = lane.swimmer.name !== undefined ? lane.swimmer.name : ''
        if (this.props.orientation === laneOrientation.right) {
            displayText = lastname + " " + lane.finishtime
        }
        else {
            displayText = lane.finishtime + " " + lastname
        }
        return displayText;
    }

    getNumberBoxes() {
        var box = <g key="layer1">
            {
                this.props.lanes.map((lane, index) => {

                    let idname = "lane" + index

                    if (lane.finishtime !== 'undefined' && lane.place !== 'undefined') {

                        var number = this.getNumberBox(lane.lane, "idnumberbox" + index, this.getStartPoint(lane.lane))
                        var name = this.getNameBox(lane.lane, "idname" + index, this.getStartPoint(lane.lane))
                        var text
                        if (this.props.orientation === laneOrientation.right) {
                            text = this.getNameTextRight(lane.lane, "text" + index, this.getFinishText(lane), this.getStartPoint(lane.lane))
                        } else {
                            text = this.getNameTextLeft(lane.lane, "text" + index, this.getFinishText(lane), this.getStartPoint(lane.lane))
                        }

                        return <g key={idname}> {number} {name} {text}</g>
                    } else {
                        return <g key={idname}></g>
                    }
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
                y={textstart} x={this.start_place}
                fontSize={this.text_height}
            >
                {lane}</text>
            <text key={'t1' + index} className={textlanesvg}
                y={textstart} x={this.start_name}
                fontSize={this.text_height}
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
                fontSize={this.text_height}
                text-anchor="end"
            >
                {lane}</text>
            <text key={'t1' + index} className={textlanesvg}
                y={textstart} x={this.image_width - 48}
                fontSize={this.text_height}
                text-anchor="end"
            >
                {name}</text>
        </g>
    }

    getStartPoint(lane: number) {
        var start = (lane - 1) * this.col_height
        var startpoint
        if (this.props.reverseorder) {
            let height = this.col_height * this.props.lanes.length;
            startpoint = height - start - this.col_height;
        } else {
            startpoint = (lane - 1) * this.col_height;
        }
        return startpoint
    }

    render() {

        let gradient_lane = classnames('gradient_lane');
        let gradient_name = classnames('gradient_name');
        let gradient_name_end = classnames('gradient_name_end');
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
                        stopOpacity="1"
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
                        className={gradient_name_end}
                        offset="1"
                        stopOpacity="1"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="0"
                    x2={this.pixel_text_length}
                    y1="0"
                    x1="0"
                    id="nameGradientStyle"
                    xlinkHref="#HeatNumaeGradient"
                />

            </defs>
            {this.getNumberBoxes()}
        </svg>
        );
    }
}