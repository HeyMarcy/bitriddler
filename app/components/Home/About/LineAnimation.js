import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import Line from 'components/Shape/Line';
import { toRadians } from 'utils/math';

const ANIMATION_BREAK = 30;
const animations = [
];

export default class LineAnimation extends React.Component {
  static propTypes = {
    waitFor: React.PropTypes.number,
    thickness: React.PropTypes.number,
    color: React.PropTypes.string,
    animations: React.PropTypes.arrayOf(React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
      angle: React.PropTypes.number,
      distance: React.PropTypes.number,
      opacity: React.PropTypes.number,
    })),
    initial: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
      angle: React.PropTypes.number,
      distance: React.PropTypes.number,
      opacity: React.PropTypes.number,
    }),
    repeatAt: React.PropTypes.number,
    repeatInterval: React.PropTypes.number,
    stopAnimation: React.PropTypes.number,
  };

  static defaultProps = {
    waitFor: 1000,
  };

  componentWillMount() {
    this.setState({
      animationIndex: 0,
      wait: true,
    });

    setTimeout(() => {
      this.setState({ wait: false });
    }, this.props.waitFor)
  }

  renderLine = ({ x, y, angle, distance, opacity }) => (
    <Line
      distance={distance}
      angle={toRadians(angle)}
      from={{ x, y }}
      color={this.props.color}
      thickness={this.props.thickness}
      opacity={opacity}
    />
  );

  runNextAnimation = () => {
    const {
      animationIndex,
    } = this.state;

    const {
      repeatAt,
      stopAnimation,
    } = this.props;

    if(stopAnimation) {
    }

    else if(animationIndex < this.props.animations.length - 1) {
      this.setState({
        animationIndex: animationIndex + 1,
      });
    }

    else if(repeatAt) {
      this.setState({
        inRepeatMode: true,
        animationIndex: repeatAt,
      });
    }
  }

  addPreviousAnimations(initialAnimation, animations, animationIndex) {
    let previous = {};
    for (var i = animationIndex; i >= 0; i--) {
      previous = {
        ...animations[i],
        ...previous,
      };
    }
    return {
      ...initialAnimation,
      ...previous,
    };
  }

  render() {
    const {
      animationIndex,
      wait,
      inRepeatMode,
    } = this.state;

    const {
      animations,
      initial,
      repeatInterval,
    } = this.props;

    const defaultInitial = {
      x: 0,
      y: 0,
      angle: 0,
      distance: 0,
      opacity: 0,
    };

    let animation;
    let initialAnimation = { ...defaultInitial, ...initial };

    if(wait) {
      animation = initialAnimation;
    } else {
      animation = this.addPreviousAnimations(initialAnimation, animations, animationIndex);
    }

    return (
      <Motion
        defaultStyle={initialAnimation}
        style={{
          x: spring(animation.x),
          y: spring(animation.y),
          angle: spring(animation.angle),
          distance: spring(animation.distance),
        }}
        onRest={() => setTimeout(this.runNextAnimation, inRepeatMode ? repeatInterval : ANIMATION_BREAK )}
      >
        {(style) => this.renderLine(style)}
      </Motion>
    );
  }
}
