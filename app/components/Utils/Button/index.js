import React from 'react';
import styled from 'styled-components';
import {
  transparent,
  white,
  black,
} from 'material-ui/styles/colors';

const Button = styled.button`
  cursor: pointer;
  background: ${transparent};
  color: ${white};
  border: 1px solid ${white};
  transition: background-color 0.5s ease,
              color 0.5s ease;
  &:hover {
    background: ${white};
    color: ${(props) => props.activeColor};
  }
`;

export default ({ activeColor, ...props }) => (
  <Button
    activeColor={activeColor}
    {...props}
  />
);
