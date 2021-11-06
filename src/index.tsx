import React from 'react';
import ReactDOM from 'react-dom';
import Test from './pages/Status';

import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter } from 'react-router-dom';
import Start from './pages/Start'
import Pool from './pages/PoolStart'

const routing = (
    <BrowserRouter basename="/overlay">
        <Route path="/" exact component={Start} />
        <Route path="/status" exact component={Test} />
        <Route path="/:racestate/:orientation" exact component={Pool} />
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));


//<Route path="/:orientation" exact component={App} />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
