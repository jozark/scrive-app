import React from 'react';
import Typography from './Typography';

export default {
  title: 'Component/Typography',
  component: Typography,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const typography = (): JSX.Element => (
  <>
    <Typography type="h1">Heading H1</Typography>
    <Typography type="h2">Heading H2</Typography>
    <Typography type="h3">Heading H3</Typography>
    <Typography type="p">Paragraph Active</Typography>
    <Typography type="passive">Paragraph Passive</Typography>
  </>
);
