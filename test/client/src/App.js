import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListDevices from './routes/ListDevices';
import Viewer from './routes/Viewer';
import Camera from './routes/Camera';

function App() {
  return (
    <BrowserRouter basename="/peer">
      <Switch>
        <Route path="/" exact component={ListDevices} />
        <Route path="/camera/:roomID/:videoID/:audioID" component={Camera} />
        <Route path="/view/:roomID" component={Viewer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
