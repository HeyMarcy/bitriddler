import React from 'react';
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
import Button from 'components/Utils/Button';
import Wall from 'components/AI/Wall';
import Creature from 'components/AI/Creature';
import Line from 'components/LineAnimations/Line';
import BoxAnimation from 'components/Animations/BoxAnimation';

const stringifyTranslate = ({ x, y, z }) => `transform: perspective(100px) translate3d(${x}px, ${y}px, ${z}px);`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const AboutContentWrapper = styled.div`
`;

const animateValue = 300;

const Title = styled.h2`
  color: ${fullWhite};
  ${(props) => stringifyTranslate({
    x: (1 - props.animateTo) * animateValue,
    y: 0,
    z: 0,
  })}
`;

const Subtitle = styled.h3`
  color: ${lightWhite};
  ${(props) => stringifyTranslate({
    x: (1 - props.animateTo) * animateValue,
    y: 0,
    z: 0,
  })}
`;

const Description = styled.h4`
  color: ${darkWhite};
  max-width: 400px;
  ${(props) => stringifyTranslate({
    x: (1 - props.animateTo) * animateValue,
    y: 0,
    z: 0,
  })}
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

export default class About extends React.Component {
  componentWillMount(nextProps, nextState) {
    this.setState({
      contentWidth: 0,
      contentHeight: 0,
      contentPadding: 60,
      lineAnimations: [],
      initialLinesPosition: this.getInitialLinesPosition(),
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.contentWidth > 10
      && nextState.lineAnimations.length === 0
      && nextProps.startAnimation) {
      this.runLinesEnterAnimations(nextState);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onLeaveAnimationFinish } = nextProps;
    const { contentWidth, contentHeight } = this.state;

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

  getStartAnimations = ({ verticalSpace, horizontalSpace, contentHeight, contentWidth }) => ([
    [
      { opacity: 0.2, x: 0, distance: getWindowWidth() },
      { opacity: 1, y: verticalSpace, onStart: this.runBoxAnimation },
      { x: getWindowWidth() / 2 - contentWidth / 2, distance: contentWidth, onFinish: () => this.setState({ openRightAndLeft: true  }) },
      { x: 0, distance: getWindowWidth(), onFinish: () => this.setState({ openTopAndBottom: true }) },
      { y: 0, }
    ],
    [
      { opacity: 0.2, x: 0, distance: getWindowWidth() },
      { opacity: 1, y: getWindowHeight() - verticalSpace },
      { x: getWindowWidth() / 2 - contentWidth / 2, distance: contentWidth },
      { x: 0, distance: getWindowWidth() },
      { y: getWindowHeight(), }
    ],
    [
      { opacity: 0.2, y: 0, distance: getWindowHeight() },
      { opacity: 1, x: horizontalSpace },
      { y: getWindowHeight() / 2 - contentHeight / 2, distance: contentHeight },
      { x: 0 - 10, opacity: 0 },
    ],
    [
      { opacity: 0.2, y: 0, distance: getWindowHeight() },
      { opacity: 1, x: getWindowWidth() - horizontalSpace },
      { y: getWindowHeight() / 2 - contentHeight / 2, distance: contentHeight },
      { x: getWindowWidth() + 10, opacity: 0 },
    ]
  ]);

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

  renderLineAnimations({ initialLinesPosition, lineAnimations }) {
    const waitFor = 100;

    return [
      // Top and bottom
      <Line
        waitFor={waitFor}
        key={1}
        initial={initialLinesPosition[0]}
        animations={lineAnimations[0]}
      />,
      <Line
        waitFor={waitFor}
        key={4}
        initial={initialLinesPosition[1]}
        animations={lineAnimations[1]}
      />,
      // Left and right
      <Line
        waitFor={waitFor}
        key={2}
        initial={initialLinesPosition[2]}
        animations={lineAnimations[2]}
      />,
      <Line
        waitFor={waitFor}
        key={3}
        initial={initialLinesPosition[3]}
        animations={lineAnimations[3]}
      />,
    ];
  }

  render() {
    const {
      primaryColor,
      onLoadingReady,
      runLeaveAnimation,
      onLeaveAnimationFinish,
      onWorkExperienceClick,
      onSkillsClick,
      onReactPlaygroundClick,
      showEntranceAnimation,
      startAnimation,
      loadLineConfig,
    } = this.props;

    const {
      contentWidth,
      contentHeight,
      runBoxAnimation,
      runBoxLeaveAnimation,
      initialLinesPosition,
      lineAnimations,
      contentPadding,
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
      <Wrapper primaryColor={primaryColor}>
        <InnerWrapper>
          <Measure
            whitelist={['width', 'height']}
            onMeasure={({ width, height }) => this.setState({ contentWidth: width, contentHeight: height })}
          >
            <AboutContentWrapper>
              <Title>
                Kareem Mohamed,
              </Title>
              <Subtitle>
                Front-end / UI Developer
              </Subtitle>
              <Description>
                Hi. I produce elegant, performant, and accessible digital experiences. Currently working at Blackcrows, FR.
              </Description>
              <ButtonsWrapper>
                <StyledButton
                  onClick={onWorkExperienceClick}
                  activeColor={primaryColor}
                >
                  Work experience
                </StyledButton>
              </ButtonsWrapper>
            </AboutContentWrapper>
          </Measure>
        </InnerWrapper>
        {
          showEntranceAnimation &&
          <BoxAnimation
            openVerticalValue={openVerticalValue}
            openHorizontalValue={openHorizontalValue}
            closeTop={runBoxLeaveAnimation}
            closeBottom={runBoxLeaveAnimation}
            closeAll={!runBoxAnimation}
            primaryColor={primaryColor}
          />
        }
        {
          showEntranceAnimation &&
          this.renderLineAnimations({ initialLinesPosition, lineAnimations })
        }
      </Wrapper>
    );
  }
}
