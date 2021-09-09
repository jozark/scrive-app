import React, { useEffect, useState } from 'react';

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

  return <p>app</p>;
}

export default App;
