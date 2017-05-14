import React from 'react';
import styled from 'utils/styled-components';

export default styled.div`
  ${(props) => !props.noVerticalPadding && `
    padding-top: 12px;
    padding-bottom: 12px;
  `}
  ${(props) => !props.noHorizontalPadding && `
    padding-left: 24px;
    padding-right: 24px;
  `}
  max-width: 1200px;
  margin: 0 auto;
`;
