import React from 'react';
import {
  getWindowWidth,
  getWindowHeight,
} from 'utils/screen';
import styled from 'styled-components';
import BoxAnimation from 'components/Animations/BoxAnimation';
import Line from 'components/LineAnimations/Line';

const AnimationWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

export default class EntranceAnimation extends React.Component {

  componentWillMount() {
    if(this.props.startAnimation) {
      this.startAnimation(this.props);
    } else {
      this.setState({
        initialLinesPosition: [],
        lineAnimations: [],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.startAnimation &&
      nextProps.startAnimation !== this.props.startAnimation) {
      this.startAnimation(nextProps);
    }
  }

  startAnimation = (props) => {
    this.setState({
      initialLinesPosition: this.getInitialLinesPosition(),
      lineAnimations: this.getStartAnimations(props.onEntranceAnimationFinish),
    });
  }

  getInitialLinesPosition = () => ([
    // Vertical lines
    {
      x: 0,
      angle: 90,
    },
    {
      x: getWindowWidth() * 0.25,
      angle: 90,
    },
    {
      x: getWindowWidth() * 0.5,
      angle: 90,
    },
    {
      x: getWindowWidth() * 0.75,
      angle: 90,
    },
    // Horizontal lines
    {
      y: 0,
    },
    {
      y: getWindowHeight() * 0.25,
    },
    {
      y: getWindowHeight() * 0.5,
    },
    {
      y: getWindowHeight() * 0.75,
    },
  ]);

  getStartAnimations = (onEntranceAnimationFinish) => ([
    // Vertical walls
    [
      {
        distance: getWindowHeight(),
      },
    ],
    [
      {
        distance: getWindowHeight(),
      },
    ],
    [
      {
        distance: getWindowHeight(),
      },
    ],
    [
      {
        distance: getWindowHeight(),
      },
    ],
    // Horizontal walls
    [
      {
        distance: getWindowWidth(),
      },
    ],
    [
      {
        distance: getWindowWidth(),
      },
    ],
    [
      {
        distance: getWindowWidth(),
      },
    ],
    [
      {
        distance: getWindowWidth(),
        restOn: 'distance',
        onFinish: onEntranceAnimationFinish,
      },
    ],
  ]);

  renderLineAnimations({ initialLinesPosition, lineAnimations }) {
    return lineAnimations.map((lineAnimation, index) => (
      <Line
        key={index}
        waitFor={100}
        initial={initialLinesPosition[index]}
        animations={lineAnimations[index]}
      />
    ));
  }

  render() {
    const {
      initialLinesPosition,
      lineAnimations,
    } = this.state;

    const {
      primaryColor,
      startAnimation,
      ...props,
    } = this.props;

    return (
      <AnimationWrapper {...props}>
        {this.renderLineAnimations({ initialLinesPosition, lineAnimations })}
      </AnimationWrapper>
    );
  }
}
