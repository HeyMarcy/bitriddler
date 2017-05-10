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
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  transition: background-color 0.5s ease,
              color 0.5s ease;
  &:hover {
    background: ${(props) => props.color};
    color: ${(props) => props.activeColor || props.inverseColor};
  }
`;

const PrimaryButton = styled(Button)`
`;

const SecondaryButton = styled(Button)`
`;

export default ({ secondary, activeColor, ...props }) => {
  if(secondary) {
    return <SecondaryButton color={black} inverseColor={white} activeColor={activeColor} {...props} />
  }
  return <PrimaryButton color={white} inverseColor={black} activeColor={activeColor} {...props} />
}
