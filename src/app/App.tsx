import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Spotify from './pages/Spotify/Spotify';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

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
