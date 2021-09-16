import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Spotify from './pages/Spotify/Spotify';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/spotify">
          <Spotify />
        </Route>
        <Route path="/">
          <h1>Hello</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
