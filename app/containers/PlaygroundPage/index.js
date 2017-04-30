import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

export class Playground extends React.Component {
  render() {
    return (
      <Wrapper>
        Creativity is intelligence having fun
      </Wrapper>
    );
  }
}

Playground.propTypes = {

};

Playground.defaultProps = {

};

export default Playground;
