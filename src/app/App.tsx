import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home/Home';
import Spotify from './pages/Spotify/Spotify';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/spotify">
          <Spotify />
        </Route>
        <Route path="/Drawer">
          <Drawer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
