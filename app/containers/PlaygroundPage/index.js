import React from 'react';
import LoadingBar from 'components/LineAnimations/LoadingBar';
import FadeInBottom from 'components/Animations/FadeInBottom';
import CircularButton from 'components/Animations/CircularButton';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #333;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default () => (
  <Wrapper>
    <CircularButton />
  </Wrapper>
);
