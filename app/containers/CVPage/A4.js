import React from 'react';
import styled from 'styled-components';

const A4_RATIO = (297 / 210);

const Wrapper = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => A4_RATIO * props.width}px;
  overflow: hidden;
  margin: 0 auto;
  // border-right: 1px solid #333;
  // border-left: 1px solid #333;
`;

export default ({ width = 1200, children }) => (
  <Wrapper width={width}>
    {children}
  </Wrapper>
);
