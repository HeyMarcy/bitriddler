import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { StaggeredMotion, spring } from 'react-motion';
import styled from 'styled-components';
import {
  fullWhite,
  darkWhite,
  lightWhite,
} from 'material-ui/styles/colors';
import {
  getWindowWidth,
  getWindowHeight,
} from 'utils/screen';
import Line from 'components/LineAnimations/Line';
import BoxAnimation from 'components/Animations/BoxAnimation';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export default class IntroEntranceAnimation extends React.Component {

  static propTypes = {
    contentWidth: PropTypes.number.isRequired,
    contentHeight: PropTypes.number.isRequired,
    contentPadding: PropTypes.number.isRequired,
    startAnimation: PropTypes.bool,
    runLeaveAnimation: PropTypes.bool,
    onLeaveAnimationFinish: PropTypes.func.isRequired,
    fullAnimation: PropTypes.bool,
  };

  componentWillMount(nextProps, nextState) {
    this.setState({
      lineAnimations: [],
      initialLinesPosition: this.getInitialLinesPosition(),
    });
  }

  componentDidMount() {
    if(this.props.startAnimation) {
      this.runLinesEnterAnimations(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      onLeaveAnimationFinish
    } = nextProps;

    if(nextProps.startAnimation && !this.props.startAnimation) {
      this.runLinesEnterAnimations(nextProps);
    }

    if(nextProps.runLeaveAnimation && nextProps.runLeaveAnimation !== this.props.runLeaveAnimation) {
      this.runLinesLeaveAnimations({ contentWidth, contentHeight, onLeaveAnimationFinish });
    }
  }

  runLinesEnterAnimations = ({ contentWidth, contentHeight, contentPadding }) => {
    const horizontalSpace = getWindowWidth() / 2 - contentWidth / 2 - contentPadding;
    const verticalSpace = getWindowHeight() / 2 - contentHeight / 2 - contentPadding;

    this.setState({
      lineAnimations: this.getStartAnimations({
        verticalSpace,
        horizontalSpace,
        contentWidth: contentWidth + contentPadding * 2,
        contentHeight: contentHeight + contentPadding * 2,
      })
    });
  }

  runLinesLeaveAnimations = ({ contentWidth, contentHeight, onLeaveAnimationFinish }) => {
    this.setState({
      lineAnimations: this.getLeaveAnimations({
        contentWidth,
        contentHeight,
        onLeaveAnimationFinish,
      }),
    });
  }

  runBoxAnimation = () => this.setState({ runBoxAnimation: true })
  runBoxLeaveAnimation = () => this.setState({ runBoxLeaveAnimation: true });

  // Top bottom, left right
  getInitialLinesPosition = () => ([
    { opacity: 0, y: getWindowHeight() / 2, x: getWindowWidth() / 2 },
    { opacity: 0, y: getWindowHeight() / 2, x: getWindowWidth() / 2 },
    { opacity: 0, y: getWindowHeight() / 2, x: getWindowWidth() / 2, angle: 90 },
    { opacity: 0, y: getWindowHeight() / 2, x: getWindowWidth() / 2, angle: 90 },
  ]);

  getStartAnimations = ({ verticalSpace, horizontalSpace, contentHeight, contentWidth, fullAnimation }) => {
    // This will animate to the content width and height
    const animations = [
      [
        { opacity: 0.2, x: 0, distance: getWindowWidth() },
        { opacity: 1, y: verticalSpace, onStart: this.runBoxAnimation },
        { x: getWindowWidth() / 2 - contentWidth / 2, distance: contentWidth, onFinish: () => this.setState({ openRightAndLeft: true  }) },
      ],
      [
        { opacity: 0.2, x: 0, distance: getWindowWidth() },
        { opacity: 1, y: getWindowHeight() - verticalSpace },
        { x: getWindowWidth() / 2 - contentWidth / 2, distance: contentWidth },
      ],
      [
        { opacity: 0.2, y: 0, distance: getWindowHeight() },
        { opacity: 1, x: horizontalSpace },
        { y: getWindowHeight() / 2 - contentHeight / 2, distance: contentHeight },
      ],
      [
        { opacity: 0.2, y: 0, distance: getWindowHeight() },
        { opacity: 1, x: getWindowWidth() - horizontalSpace },
        { y: getWindowHeight() / 2 - contentHeight / 2, distance: contentHeight },
      ],
    ];

    if(fullAnimation) {
      // Add full animation for top wall
      animations[0].push({ x: 0, distance: getWindowWidth(), onFinish: () => this.setState({ openTopAndBottom: true }) });
      animations[0].push({ y: 0, });
      // Add full animation for bottom wall
      animations[1].push({ x: 0, distance: getWindowWidth() });
      animations[1].push({ y: getWindowHeight(), });
      // Add full animation for left wall
      animations[2].push({ x: 0 - 10, opacity: 0 });
      // Add full animation for right wall
      animations[3].push({ x: getWindowWidth() + 10, opacity: 0 });
    }

    return animations;
  }

  getLeaveAnimations = ({ contentWidth, contentHeight, onLeaveAnimationFinish }) => ([
    // top
    [
      { y: getWindowHeight() / 2, onStart: this.runBoxLeaveAnimation, restOn: true, opacity: 0 },
      { x: getWindowWidth() / 2, distance: 0 },
    ],
    // Bottom
    [
      { y: getWindowHeight() / 2, restOn: true },
      { x: getWindowWidth() / 2, distance: 0, onFinish: (config) => onLeaveAnimationFinish({ lineConfig: config }) },
    ],
    // Left
    [
      { distance: 0 }
    ],
    // Right
    [
      { distance: 0 }
    ]
  ]);

  renderLineAnimations({ initialLinesPosition, lineAnimations, color }) {
    const waitFor = 100;

    return [
      // Top and bottom
      <Line
        color={color}
        waitFor={waitFor}
        key={1}
        initial={initialLinesPosition[0]}
        animations={lineAnimations[0]}
      />,
      <Line
        color={color}
        waitFor={waitFor}
        key={4}
        initial={initialLinesPosition[1]}
        animations={lineAnimations[1]}
      />,
      // Left and right
      <Line
        color={color}
        waitFor={waitFor}
        key={2}
        initial={initialLinesPosition[2]}
        animations={lineAnimations[2]}
      />,
      <Line
        color={color}
        waitFor={waitFor}
        key={3}
        initial={initialLinesPosition[3]}
        animations={lineAnimations[3]}
      />,
    ];
  }

  render() {
    const {
      wallColor,
      runLeaveAnimation,
      onLeaveAnimationFinish,
      startAnimation,
      contentWidth,
      contentHeight,
      contentPadding,
      color,
    } = this.props;

    const {
      runBoxAnimation,
      runBoxLeaveAnimation,
      initialLinesPosition,
      lineAnimations,
      openRightAndLeft,
      openTopAndBottom,
    } = this.state;

    let openVerticalValue, openHorizontalValue;

    if(openTopAndBottom) {
      openVerticalValue = 0;
      openHorizontalValue = 0;
    }
    else if(openRightAndLeft) {
      openVerticalValue = 1 - ((contentHeight + contentPadding * 2) / getWindowHeight());
      openHorizontalValue = 0;
    } else {
      openVerticalValue = 1 - ((contentHeight + contentPadding * 2) / getWindowHeight());
      openHorizontalValue = 1 - ((contentWidth + contentPadding * 2) / getWindowWidth());
    }

    return (
      <Wrapper>
        <BoxAnimation
          openVerticalValue={openVerticalValue}
          openHorizontalValue={openHorizontalValue}
          closeTop={runBoxLeaveAnimation}
          closeBottom={runBoxLeaveAnimation}
          closeAll={!runBoxAnimation}
          primaryColor={wallColor}
        />
        {
          this.renderLineAnimations({ initialLinesPosition, lineAnimations, color })
        }
      </Wrapper>
    );
  }
}
