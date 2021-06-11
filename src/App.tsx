import React from 'react';
import './styles/App.scss';
import { FrontendState } from './state/FrontendState';
import classnames from 'classnames';
import PoolStart from './pages/PoolStart';
import { PropsType } from './types/PropsType';

// Your component own properties

export default class App extends React.Component<PropsType, FrontendState> {

    render() {
        let base = classnames('base');

        return (
            <div className={base} >
                    <PoolStart
                        match={this.props.match}
                        history={this.props.history}
                        location={this.props.location}
                    />
            </div>
        );
    }
}
