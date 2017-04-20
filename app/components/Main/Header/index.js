import React from 'react';
import Logo from '../Logo';
import { scaleRotate as Menu } from 'react-burger-menu';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 15;
`;

const LogoWrapper = styled.div`
`;

export default ({ ...props }) => (
  <Wrapper {...props}>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
  </Wrapper>
);
