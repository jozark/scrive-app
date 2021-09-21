import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Spotify from './pages/Spotify/Spotify';
import Player from './components/Player/Player';
// import { AppProvider } from './context/PlayerContext';

function App(): JSX.Element {
  return (
    // <AppProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/spotify">
          <Spotify />
        </Route>
        <Route path="/player/:id">
          <Player />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
    // </AppProvider>
  );
}

export default App;
