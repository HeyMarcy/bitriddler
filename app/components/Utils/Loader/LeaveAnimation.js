import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'utils/styled-components';

const ItemWrapper = styled.div`
  display: flex;
  opacity: ${(props) => props.opacity};
`;

export default class LeaveAnimation extends React.Component {

  getDefaultStyle() {
    return {
      opacity: 1,
    };
  }

  getStyle(startAnimation) {
    return {
      opacity: spring(startAnimation ? 0 : 1),
    };
  }

  render() {
    const {
      children,
      startAnimation,
      onRest,
    } = this.props;

    return (
      <Motion
        defaultStyle={this.getDefaultStyle()}
        style={this.getStyle(startAnimation)}
        onRest={onRest}
      >
        {(style) => (
          <ItemWrapper {...style}>
            {children}
          </ItemWrapper>
        )}
      </Motion>
    );
  }
}
