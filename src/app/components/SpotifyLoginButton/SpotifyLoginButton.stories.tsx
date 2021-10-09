import React from 'react';
import SpotifyLoginButton from './SpotifyLoginButton';

export default {
  title: 'Component/Button',
  component: SpotifyLoginButton,
};

export const SpotifyLogin = (): JSX.Element => (
  <SpotifyLoginButton color="spotify" url="/">
    Connect with Spotify
  </SpotifyLoginButton>
);
