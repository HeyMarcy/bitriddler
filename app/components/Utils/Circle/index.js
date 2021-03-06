import React from 'react';
import Box from '../Box';
import styled from 'utils/styled-components';

const StyledBox = styled(Box)`
  border-radius: 50%;
`;

export default ({ ...props }) => (
  <StyledBox {...props} />
);
