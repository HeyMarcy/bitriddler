import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const LeftBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.animation * 50}vw;
  height: 100vh;
  background: ${(props) => props.primaryColor};
`;

const RightBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${(props) => props.animation * 50}vw;
  height: 100vh;
  background: ${(props) => props.primaryColor};
`;

const TopBox = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: ${(props) => props.animation * 50}vh;
  background: ${(props) => props.primaryColor};
`;

const BottomBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: ${(props) => props.animation * 50}vh;
  background: ${(props) => props.primaryColor};
`;

export default class AnimationBox extends React.Component {
  static propTypes = {
    closeAll: React.PropTypes.bool,
    closeLeft: React.PropTypes.bool,
    closeRight: React.PropTypes.bool,
    closeTop: React.PropTypes.bool,
    closeBottom: React.PropTypes.bool,
    closeValue: React.PropTypes.bool,
    primaryColor: React.PropTypes.string,
  };

  static defaultProps = {
    closeValue: 1,
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
    closeValue,
  }) => ({
    animateLeft: closeAll || closeLeft ? closeValue : 0,
    animateRight: closeAll || closeRight ? closeValue : 0,
    animateTop: closeAll || closeTop ? closeValue : 0,
    animateBottom: closeAll || closeBottom ? closeValue : 0,
  });

  render() {
    const {
      primaryColor,
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
      >
        {({ animateLeft, animateRight, animateTop, animateBottom }) => (
          <Wrapper {...props}>
            <LeftBox primaryColor={primaryColor} animation={animateLeft} />
            <RightBox primaryColor={primaryColor} animation={animateRight} />
            <TopBox primaryColor={primaryColor} animation={animateTop} />
            <BottomBox primaryColor={primaryColor} animation={animateBottom} />
          </Wrapper>
        )}
      </Motion>
    );
  }
}
