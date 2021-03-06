import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import styled from 'utils/styled-components';

const Wrapper = styled.div`
`;

const LeftBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.animation * props.width}vw;
  height: 100vh;
  background: ${(props) => props.primaryColor};
`;

const RightBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${(props) => props.animation * props.width}vw;
  height: 100vh;
  background: ${(props) => props.primaryColor};
`;

const TopBox = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: ${(props) => props.animation * props.width}vh;
  background: ${(props) => props.primaryColor};
`;

const BottomBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: ${(props) => props.animation * props.width}vh;
  background: ${(props) => props.primaryColor};
`;

export default class AnimationBox extends React.Component {
  static propTypes = {
    closeAll: PropTypes.bool,
    closeLeft: PropTypes.bool,
    closeRight: PropTypes.bool,
    closeTop: PropTypes.bool,
    closeBottom: PropTypes.bool,
    closeHorizontalValue: PropTypes.number,
    closeVerticalValue: PropTypes.number,
    openHorizontalValue: PropTypes.number,
    openVerticalValue: PropTypes.number,
    primaryColor: PropTypes.string,

    leftWidth: PropTypes.number,
    rightWidth: PropTypes.number,
    topWidth: PropTypes.number,
    bottomWidth: PropTypes.number,
    onRest: PropTypes.func,
  };

  static defaultProps = {
    closeVerticalValue: 1,
    closeHorizontalValue: 1,
    openVerticalValue: 0,
    openHorizontalValue: 0,
    leftWidth: 50,
    rightWidth: 50,
    topWidth: 50,
    bottomWidth: 50,
  };

  componentWillMount() {
    this.setState({
      defaultStyle: this.getAnimateValues(this.props),
    });
  }

  getAnimateValues = ({
    closeAll,
    closeLeft,
    closeRight,
    closeTop,
    closeBottom,
    closeHorizontalValue,
    closeVerticalValue,
    openHorizontalValue,
    openVerticalValue,
  }) => ({
    animateLeft: closeAll || closeLeft ? closeHorizontalValue : openHorizontalValue,
    animateRight: closeAll || closeRight ? closeHorizontalValue : openHorizontalValue,
    animateTop: closeAll || closeTop ? closeVerticalValue : openVerticalValue,
    animateBottom: closeAll || closeBottom ? closeVerticalValue : openVerticalValue,
  });

  render() {
    const {
      primaryColor,
      leftWidth,
      rightWidth,
      topWidth,
      bottomWidth,
      onRest,
      ...props,
    } = this.props;

    const {
      defaultStyle,
    } = this.state;

    const {
      animateLeft,
      animateRight,
      animateTop,
      animateBottom,
    } = this.getAnimateValues(props);

    return (
      <Motion
        defaultStyle={defaultStyle}
        style={{
          animateLeft: spring(animateLeft),
          animateRight: spring(animateRight),
          animateTop: spring(animateTop),
          animateBottom: spring(animateBottom),
        }}
        onRest={onRest}
      >
        {({ animateLeft, animateRight, animateTop, animateBottom }) => (
          <Wrapper {...props}>
            <LeftBox width={leftWidth} primaryColor={primaryColor} animation={animateLeft} />
            <RightBox width={rightWidth} primaryColor={primaryColor} animation={animateRight} />
            <TopBox width={topWidth} primaryColor={primaryColor} animation={animateTop} />
            <BottomBox width={bottomWidth} primaryColor={primaryColor} animation={animateBottom} />
          </Wrapper>
        )}
      </Motion>
    );
  }
}
