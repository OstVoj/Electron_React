/* eslint-disable fp/no-class, fp/no-this */

import { remote } from 'electron';

import React, { Component } from 'react';

const PropTypes = require('prop-types');

const { buildFromTemplate, setApplicationMenu } = remote.Menu;

class ApplicationMenu extends Component {
  constructor(props) {
    super(props);
    this.appendMenuItem = this.appendMenuItem.bind(this);
    this.menuItems = [];
    this.updated = true;
  }

  getChildContext() {
    return { append: this.appendMenuItem };
  }

  componentDidMount() {
    this.renderMenu();
    this.domNode.remove();
    this.domNode = null;
  }

  componentDidUpdate() {
    this.renderMenu();
  }

  componentWillUnmount() {
    this.menuItems = [];
    this.renderMenu();
  }

  appendMenuItem(menuItem, updated = true) {
    this.menuItems.push(menuItem);
    this.updated = updated || this.updated;
  }

  renderMenu() {
    if (this.updated) {
      setApplicationMenu(buildFromTemplate(this.menuItems));
    }
    this.menuItems = [];
    this.updated = false;
  }

  render() {
    const { children } = this.props;

    return (
      <div
        ref={div => {
          this.domNode = div;
        }}
      >
        {children}
      </div>
    );
  }
}

ApplicationMenu.childContextTypes = {
  append: PropTypes.func.isRequired
};

ApplicationMenu.propTypes = {
  children: PropTypes.node
};

export default ApplicationMenu;
