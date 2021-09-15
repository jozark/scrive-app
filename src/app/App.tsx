import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Spotify from './pages/Spotify/Spotify';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about">
          <Spotify />
        </Route>
        <Route path="/">
          <main>Home</main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
