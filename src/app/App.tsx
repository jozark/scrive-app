import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginButton from './components/LoginButton/LoginButton';

function App(): JSX.Element {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken(): Promise<void> {
      const response = await fetch('/api/auth/token');
      const data = await response.json();
      setToken(data.token);
    }

    getToken();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route></Route>
      </Switch>
      {token ? <p>SearchBar</p> : <LoginButton />}
    </BrowserRouter>
  );
}

export default App;
