import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';

type ContextProps = {
  children: ReactNode;
};

const PlayerContext = createContext({ player: null });

export const AppProvider: JSX.Element = (props: ContextProps): JSX.Element => {
  const [data, setData] = useState<{ player: Spotify.Player | null }>({
    player: null,
  });

  async function getToken(): Promise<string> {
    const response = await fetch('/api/auth/token');
    const data = await response.json();
    return data.token;
  }
  useEffect(() => {
    const run = async () => {
      const token = await getToken();
      setData({
        player: new Spotify.Player({
          name: 'Start Player',
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        }),
      });
    };
    run();
  }, []);

  return (
    <PlayerContext.Provider value={{ ...data }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
