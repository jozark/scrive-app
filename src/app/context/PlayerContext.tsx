import type { Dispatch, SetStateAction } from 'react';
import React, { useState, createContext } from 'react';

type PlayerProps = {
  deviceID: string;
  playerIsActive: boolean;
  setDeviceID: Dispatch<SetStateAction<string>>;
  setPlayerIsActive: Dispatch<SetStateAction<boolean>>;
};

type ContextProps = {
  children: React.ReactNode;
};

export const PlayerContext = createContext<PlayerProps>({
  deviceID: '',
  playerIsActive: false,
  setDeviceID: () => null,
  setPlayerIsActive: () => null,
});

export default function PlayerContextProvider(
  props: ContextProps
): JSX.Element {
  const [playerIsActive, setPlayerIsActive] = useState<boolean>(false);
  const [deviceID, setDeviceID] = useState<string>('');

  return (
    <PlayerContext.Provider
      value={{ deviceID, playerIsActive, setDeviceID, setPlayerIsActive }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}
