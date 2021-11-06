import React from 'react';
import classnames from 'classnames';

interface EventNameInterface {
    EventName: string;
    HeatName: string;
}

export default class EventName extends React.Component<EventNameInterface, {}> {

    render() {
        let colorTextLaneName = classnames('textlanesvg');
        let colorEventName = classnames('gradient_name');
        let colorEventNameEnd = classnames('gradient_name_end');

        let boxheight = 20
        let buttonheight = 3
        let fromtop = 10
        let fromtop2 = fromtop + boxheight

        let boxWidth = 150

        let wholeHeight = 2 * (boxheight + buttonheight) + 50 

        let viewBox = "0 0 " + boxWidth + " " + wholeHeight

        let eventNamebox = "M 0 " + fromtop + " h " + boxWidth + " v " + boxheight + " h -" + boxWidth + " z"
        let eventHeatbox = "M 0 " + fromtop2 + "  h " + boxWidth + " v " + boxheight + " h -" + boxWidth + " z"
        let fontSize = 16

        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            //preserveAspectRatio="xMidYMax meet"
            preserveAspectRatio="xMaxYMax slice"
            id="svg8"
            version="1.1"
            viewBox={viewBox}
            height={wholeHeight}
            width={boxWidth}
        >
            <defs>
                <linearGradient id="StartEventName" gradientTransform="rotate(0)">
                    <stop
                        className={colorEventName}
                        offset="0"
                    />
                    <stop
                        className={colorEventNameEnd}
                        offset="1"
                    />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="0"
                    x2="1000"
                    y1="0"
                    x1="0"
                    id="EventNameHeaderStyle"
                    xlinkHref="#StartEventName"
                />
            </defs>
            <g
                id="layer1">
                <path
                    transform="scale(1)"
                    d={eventNamebox}
                    fill="url(#EventNameHeaderStyle)"
                />
                <text
                    className={colorTextLaneName}
                    y={fromtop + fontSize - 1}
                    x={boxWidth - 20}
                    fontSize={fontSize}
                    textAnchor="right"
                >
                    {this.props.EventName}</text>

                <text
                    className={colorTextLaneName}
                    y={fromtop + fontSize - 1}
                    x={8}
                    fontSize={fontSize}
                    textAnchor="left"
                >Wettkampf
                </text>
                <path
                    transform="scale(1)"
                    d={eventHeatbox}
                    fill="url(#EventNameHeaderStyle)"
                />
                <text
                    className={colorTextLaneName}
                    y={fromtop2 + fontSize - 1}
                    x={boxWidth - 20}
                    fontSize={fontSize}
                    textAnchor="right"
                >
                    {this.props.HeatName}</text>
                <text
                    className={colorTextLaneName}
                    y={fromtop2 + fontSize - 1}
                    x={8}
                    fontSize={fontSize}
                    textAnchor="right"
                >
                    Lauf</text>
            </g>
        </svg>
        );
    }
}