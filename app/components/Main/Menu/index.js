import React from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import menuStyles from './menuStyles';

export default ({ ...props }) => (
  <Menu pageWrapId={"page-wrap"} outerContainerId={ "outer-container" } styles={menuStyles}>
    <a id="home" className="menu-item" href="/">Home</a>
    <a id="about" className="menu-item" href="/about">About</a>
    <a id="contact" className="menu-item" href="/contact">Contact</a>
    <a className="menu-item--small" href="">Settings</a>
  </Menu>
);
