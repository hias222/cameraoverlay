import React from 'react';
import './styles/App.scss';
import { FrontendState } from './state/FrontendState';

import {RouteComponentProps} from "react-router";
import classnames from 'classnames';
import PoolStart from './pages/PoolStart';

type PathParamsType = {
    orientation: string,
    racestate: string
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    someString: string,
}
export default class App extends React.Component<PropsType, FrontendState> {

 
    render() {

        let base = classnames('base');

        return (
            <div className={base} >
                    <PoolStart
                        someString={'test'}
                        match={this.props.match}
                        history={this.props.history}
                        location={this.props.location}
                    />
            </div>
        );
    }
}
