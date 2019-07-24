import React from 'react';
import { ApplicationMenu, MenuItem } from './electron-react-menu';

const PropTypes = require('prop-types');
const { remote } = require('electron');

const w = remote.getCurrentWindow();

const quitApp = () => {
  w.close();
};

const toggleFullScreen = () => {
  w.setFullScreen(!w.isFullScreen());
};

const Menu = ({ openLog }) => (
  <ApplicationMenu>
    <MenuItem label="File">
      <MenuItem label="Exit" click={() => quitApp()} accelerator="Command+W" />
    </MenuItem>
    <MenuItem label="Edit">
      <MenuItem label="Copy" click={() => {}} accelerator="Command+C" />
      <MenuItem label="Paste" click={() => {}} accelerator="Command+V" />
    </MenuItem>
    <MenuItem label="View">
      <MenuItem
        label="Application Log"
        click={() => openLog()}
        accelerator="Command+L"
      />
      <MenuItem
        label="Toggle Full Screen"
        click={() => toggleFullScreen()}
        accelerator="F10"
      />
    </MenuItem>
    <MenuItem label="Help">
      <MenuItem label="Learn More" click={() => learnMore()} />
    </MenuItem>
  </ApplicationMenu>
);

Menu.propTypes = {
  openLog: PropTypes.func.isRequired
};

export default Menu;
