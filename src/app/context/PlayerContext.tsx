import type { Dispatch, SetStateAction } from 'react';
import React, { useState, createContext } from 'react';
import useDebounce from '../hooks/useDebounce';

type PlayerProps = {
  deviceID: string;
  playerIsActive: string;
  playerIsDetailed: boolean;
  setDeviceID: Dispatch<SetStateAction<string>>;
  setPlayerIsActive: Dispatch<SetStateAction<string>>;
  setPlayerIsDetailed: Dispatch<SetStateAction<boolean>>;
};

type ContextProps = {
  children: React.ReactNode;
};

export const PlayerContext = createContext<PlayerProps>({
  deviceID: '',
  playerIsActive: '',
  playerIsDetailed: false,
  setPlayerIsDetailed: () => null,
  setDeviceID: () => null,
  setPlayerIsActive: () => null,
});

export default function PlayerContextProvider(
  props: ContextProps
): JSX.Element {
  const [playerIsActive, setPlayerIsActive] = useState<string>('');
  const [deviceID, setDeviceID] = useState<string>('');
  const [playerIsDetailed, setPlayerIsDetailed] = useState<boolean>(false);

  const debouncePlayerIsActive = useDebounce(playerIsActive, 500);

  return (
    <PlayerContext.Provider
      value={{
        deviceID,
        playerIsActive: debouncePlayerIsActive,
        playerIsDetailed,
        setPlayerIsDetailed,
        setDeviceID,
        setPlayerIsActive,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}
