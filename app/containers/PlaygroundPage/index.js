import React from 'react';
import LoadingBar from 'components/LineAnimations/LoadingBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #333;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

export default () => (
  <Wrapper>
    <LoadingBar
      initialDistance={500}
      onRest={() => console.log("onREST")}
    />
  </Wrapper>
);
