import React from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import styled from 'utils/styled-components';

const MAX_TRANSLATE_Y = 100;

const Wrapper = styled.div`
`;

const ItemWrapper = styled.div`
  position: relative;
  transform: translateX(${(props) => (props.fromLeft ? -1 : 1) * (1 - props.animation) * MAX_TRANSLATE_Y}px);
  opacity: ${(props) => props.animation};
`;

export default class FadeInBottom extends React.Component {
  static propTypes = {
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      damping: React.PropTypes.number,
    }),
    start: React.PropTypes.bool,
    disable: React.PropTypes.bool,
  };

  getDefaultStyles = (children) => children.map(() => ({
    animation: 0,
  }));

  getStyles = (springConfig, start) => (prevStyles) => prevStyles.map((prevStyle, index) => ({
    animation: spring(index === 0 ? (start ? 1 : 0) : prevStyles[index - 1].animation, springConfig),
  }));

  render() {
    const {
      children,
      springConfig,
      start,
      disable,
      fromLeft,
      ...props,
    } = this.props;

    const items = React.Children.toArray(children);

    if(disable) {
      return <Wrapper {...props}>{items}</Wrapper>;
    }

    return (
      <StaggeredMotion
        defaultStyles={this.getDefaultStyles(items)}
        styles={this.getStyles(springConfig, start)}
      >
      {(styles) => (
        <Wrapper
          {...props}
        >
          {items.map((child, index) => (
            <ItemWrapper
              fromLeft={fromLeft}
              key={index}
              animation={styles[index].animation}
            >
              {child}
            </ItemWrapper>
          ))}
        </Wrapper>
      )}
      </StaggeredMotion>
    );
  }
}
