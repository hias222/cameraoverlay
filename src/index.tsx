import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './Test';

import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter } from 'react-router-dom';
import Start from './pages/Start';


const routing = (
    <BrowserRouter basename="/overlay">
        <Route path="/" exact component={Start} />
        <Route path="/test" exact component={Test} />
        <Route path="/:orientation" exact component={App} />

    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
