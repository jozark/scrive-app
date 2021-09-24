import React from 'react';
import Drawer from './Drawer';

export default {
  title: 'Component/Drawer',
  component: Drawer,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const drawerOpenNote = (): JSX.Element => (
  <Drawer
    display="note"
    isOpen={true}
    onHandleClick={() => console.log('toggle isOpen')}
    onBackArrowClick={() => console.log('switch to listView')}
    onOptionsClick={() => console.log('show me options')}
  >
    <p>Place notes Here</p>
  </Drawer>
);

export const drawerOpenList = (): JSX.Element => (
  <Drawer
    display="list"
    isOpen={true}
    onHandleClick={() => console.log('toggle isOpen')}
    onBackArrowClick={() => console.log('switch to listView')}
    onOptionsClick={() => console.log('show me options')}
  >
    <p>Place notes Here</p>
  </Drawer>
);

export const drawerClosed = (): JSX.Element => (
  <Drawer
    display="list"
    isOpen={false}
    onHandleClick={() => console.log('toggle isOpen')}
    onBackArrowClick={() => console.log('switch to listView')}
    onOptionsClick={() => console.log('show me options')}
  >
    <p>Place notes Here</p>
  </Drawer>
);
