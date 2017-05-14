import React from 'react';
import styled from 'utils/styled-components';
import { darken } from 'material-ui/utils/colorManipulator';

export default styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: ${(props) => darken(props.primaryColor, 0.2)};
`;
