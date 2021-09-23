import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Spotify from './pages/Spotify/Spotify';
import Player from './components/Player/Player';
import OverlayPlayer from './components/OverlayPlayer/OverlayPlayer';
import PlayerContextProvider, { PlayerContext } from './context/PlayerContext';
import styles from './App.module.css';

function App(): JSX.Element {
  const [token, setToken] = useState('');
  const { playerIsActive } = useContext(PlayerContext);

  useEffect(() => {
    async function getToken(): Promise<void> {
      const response = await fetch('/api/auth/token');
      const data = await response.json();
      setToken(data.token);
    }

    getToken();
  }, []);
  return (
    <PlayerContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/spotify">
            <Spotify />
          </Route>
          <Route path="/player/:id">
            <Player token={token} />
          </Route>
          <Route path="/">
            <Home token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
      {playerIsActive && (
        <OverlayPlayer token={token} className={styles.player} />
      )}
    </PlayerContextProvider>
  );
}

export default App;
