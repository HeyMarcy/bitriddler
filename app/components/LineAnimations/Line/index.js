import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import Line from 'components/Shape/Line';
import { toRadians } from 'utils/math';
import {
  lightWhite,
} from 'material-ui/styles/colors';

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
      onStart: React.PropTypes.func,
      onFinish: React.PropTypes.func,
      restOn: React.PropTypes.func,
    }),
    stopAnimation: React.PropTypes.number,
    onAnimationRun: React.PropTypes.func,
    repeat: React.PropTypes.bool,
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      damping: React.PropTypes.number,
    }),
  };

  static defaultProps = {
    waitFor: 1000,
    thickness: 1,
    color: lightWhite,
    repeat: false,
  };

  componentWillMount() {
    this.setState({
      animationIndex: 0,
      wait: true,
      animations: this.props.animations || [],
    });

    setTimeout(() => {
      this.setState({ wait: false });
    }, this.props.waitFor)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.animationIndex !== this.state.animationIndex) {
      const currentAnimation = nextState.animations[nextState.animationIndex];
      currentAnimation.onStart && currentAnimation.onStart(this.currentConfiguration);
    }

    if(nextState.animations.length - 1 > nextState.animationIndex && nextState.animationEnded) {
      this.runNextAnimation(nextState, nextProps);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.animations !== this.props.animations) {
      this.setState({
        animations: [
          ...this.state.animations.slice(0, this.state.animationIndex + 1),
          ...nextProps.animations,
        ],
      });
    }
  }

  renderLine = (configuration) => {
    this.currentConfiguration = configuration;
    const { x, y, angle, distance, opacity } = configuration;

    const {
      animationIndex,
      animations,
    } = this.state;

    const { restOn } = animations[animationIndex] || {};

    if(restOn && restOn({ x, y, angle, distance, opacity }) && !this.nextAnimationTimer) {
      this.nextAnimationTimer = setTimeout(() =>
        this.runNextAnimation(this.state, this.props), ANIMATION_BREAK);
    }

    return (
      <Line
        distance={distance < 0 ? 0 : distance}
        angle={toRadians(angle)}
        x={x < 0 ? 0 : x}
        y={y < 0 ? 0 : y}
        color={this.props.color}
        thickness={this.props.thickness}
        opacity={opacity}
      />
    );
  }

  checkNoAnimationChange = (animation) => {
    for(let key in animation) {
      if(this.currentConfiguration[key] !== animation[key]) {
        return false;
      }
    }
    console.log('checkNoAnimationChange', animation, this.currentConfiguration);
    return true;
  }

  runNextAnimation = (state, props) => {
    const {
      animationIndex,
      animations,
    } = state;

    const {
      repeat,
    } = props;

    clearTimeout(this.nextAnimationTimer);
    this.nextAnimationTimer = null;

    const currentAnimation = animations[animationIndex];
    currentAnimation.onFinish && currentAnimation.onFinish(this.currentConfiguration);

    if(animationIndex < animations.length - 1) {
      this.setState({
        animationIndex: animationIndex + 1,
        animationEnded: false,
      });
    } else if(repeat) {
      this.setState({
        animationIndex: 0,
        animationEnded: false,
      });
    } else {
      this.setState({
        animationEnded: true,
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
      animations,
    } = this.state;

    const {
      initial,
      springConfig,
    } = this.props;

    const defaultInitial = {
      x: 0,
      y: 0,
      angle: 0,
      distance: 0,
      opacity: 1,
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
          x: spring(animation.x, springConfig),
          y: spring(animation.y, springConfig),
          angle: spring(animation.angle, springConfig),
          distance: spring(animation.distance, springConfig),
          opacity: spring(animation.opacity, springConfig),
        }}
        onRest={() => {
          if(!this.nextAnimationTimer) {
            this.nextAnimationTimer = setTimeout(() =>
                this.runNextAnimation(this.state, this.props), ANIMATION_BREAK);
          }
        }}
      >
        {(style) => this.renderLine(style)}
      </Motion>
    );
  }
}
