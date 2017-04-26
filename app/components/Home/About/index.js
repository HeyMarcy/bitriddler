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
import CodeBreaker from './CodeBreaker';
import LineAnimation from './LineAnimation';
import AnimationBox from './AnimationBox';

const stringifyTranslate = ({ x, y, z }) => `transform: perspective(100px) translate3d(${x}px, ${y}px, ${z}px);`;

const Wrapper = styled.div`
  background: ${(props) => props.primaryColor};
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

const Title = styled.h3`
  color: ${fullWhite};
  ${(props) => stringifyTranslate({
    x: (1 - props.animateTo) * animateValue,
    y: 0,
    z: 0,
  })}
`;

const Subtitle = styled.h4`
  color: ${lightWhite};
  ${(props) => stringifyTranslate({
    x: (1 - props.animateTo) * animateValue,
    y: 0,
    z: 0,
  })}
`;

const Description = styled.h5`
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
  static contextTypes = {
    scrollArea: React.PropTypes.object,
  };

  componentWillMount(nextProps, nextState) {
    this.setState({
      contentWidth: 0,
      contentHeight: 0,
    })
  }

  renderLineAnimations({ contentWidth, contentHeight, stopAnimation, runLeaveAnimation }) {
    const padding = 60;
    const horizontalSpace = getWindowWidth() / 2 - contentWidth / 2 - padding;
    const verticalSpace = getWindowHeight() / 2 - contentHeight / 2 - padding;
    const constWidth = contentWidth;
    const constHeight = contentHeight;
    const thickness = 1;
    const color = lightWhite;
    const waitFor = 100;
    const repeatInterval = 10000;

    const animations = runLeaveAnimation ?
      this.getLeaveAnimations({
        constWidth,
        constHeight,
      }) :
      this.getStartAnimations({
        verticalSpace,
        horizontalSpace,
        constWidth,
        constHeight,
        contentWidth,
        contentHeight,
      });

    const initialAnimations = this.getInitialAnimations();

    return [
      // Top and bottom
      <LineAnimation
        waitFor={waitFor}
        color={'#900'}
        thickness={thickness}
        key={1}
        initial={initialAnimations[0]}
        onAnimationRun={(index) => {
          this.setState({ runBoxAnimation: true });
        }}
        animations={animations[0]}
      />,
      <LineAnimation
        waitFor={waitFor}
        color={'#990'}
        thickness={thickness}
        key={4}
        initial={initialAnimations[1]}
        animations={animations[1]}
      />,
      // Left and right
      <LineAnimation
        waitFor={waitFor}
        color={'#090'}
        thickness={thickness}
        key={2}
        initial={initialAnimations[2]}
        animations={animations[2]}
      />,
      <LineAnimation
        waitFor={waitFor}
        color={'#009'}
        thickness={thickness}
        key={3}
        initial={initialAnimations[3]}
        animations={animations[3]}
      />,
    ];
  }

  // Top bottom, left right
  getInitialAnimations = () => ([
    { y: getWindowHeight() / 2 },
    { y: getWindowHeight() / 2},
    { x: getWindowWidth() / 2, angle: 90 },
    { x: getWindowWidth() / 2, angle: 90 },
  ]);

  getStartAnimations = ({ verticalSpace, horizontalSpace, constWidth, constHeight, contentHeight, contentWidth }) => ([
    [
      { distance: getWindowWidth() },
      { y: verticalSpace },
      { x: getWindowWidth() / 2 - constWidth / 2, distance: constWidth },
      { x: getWindowWidth() / 2 - constWidth / 2 - contentWidth },
      { x: getWindowWidth() / 2 - constWidth / 2 + contentWidth },
      { x: getWindowWidth() / 2 - constWidth / 2 - contentWidth },
    ],
    [
      { distance: getWindowWidth() },
      { y: getWindowHeight() - verticalSpace },
      { x: getWindowWidth() / 2 - constWidth / 2, distance: constWidth },
      { x: getWindowWidth() / 2 - constWidth / 2 + contentWidth },
      { x: getWindowWidth() / 2 - constWidth / 2 - contentWidth },
      { x: getWindowWidth() / 2 - constWidth / 2 + contentWidth },
    ],
    [
      { distance: getWindowHeight() },
      { x: horizontalSpace },
      { y: getWindowHeight() / 2 - constHeight / 2, distance: constHeight },
      { y: getWindowHeight() / 2 - constHeight / 2 - contentHeight },
      { y: getWindowHeight() / 2 - constHeight / 2 + contentHeight },
      { y: getWindowHeight() / 2 - constHeight / 2 - contentHeight },
    ],
    [
      { distance: getWindowHeight() },
      { x: getWindowWidth() - horizontalSpace },
      { y: getWindowHeight() / 2 - constHeight / 2, distance: constHeight },
      { y: getWindowHeight() / 2 - constHeight / 2 + constHeight },
      { y: getWindowHeight() / 2 - constHeight / 2 - constHeight },
      { y: getWindowHeight() / 2 - constHeight / 2 + constHeight },
    ]
  ]);

  getLeaveAnimations = ({ constWidth, constHeight }) => ([
    [
      { x: -constWidth, distance: 0 },
    ],
    [
      { x: -constWidth, distance: 0 },
    ],
    [
      { y: -constHeight },
    ],
    [
      { y: getWindowHeight() / 2 - constHeight / 2 },
      { x: - constHeight },
    ]
  ]);

  render() {
    const {
      gotoBlackcrows,
      primaryColor,
      scrollValue,
      runLeaveAnimation,
    } = this.props;

    const {
      contentWidth,
      contentHeight,
      runBoxAnimation,
    } = this.state;

    const {
      scrollArea,
    } = this.context;

    const stopAnimation = scrollValue > getWindowHeight() / 2;

    return (
      <Wrapper primaryColor={primaryColor}>
        <AnimationBox
          closeValue={runLeaveAnimation ? 3 : 1}
          closeRight={runLeaveAnimation}
          closeAll={!runBoxAnimation}
          primaryColor={primaryColor}
        />
        {this.renderLineAnimations({ contentWidth, contentHeight, stopAnimation, runLeaveAnimation })}
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
                  onClick={() => gotoBlackcrows(scrollArea)}
                  activeColor={primaryColor}
                >
                  Work experience
                </StyledButton>
                <StyledButton
                  onClick={() => gotoSkills(scrollArea)}
                  activeColor={primaryColor}
                >
                  Skills
                </StyledButton>
                <StyledButton
                  onClick={() => gotoSkills(scrollArea)}
                  activeColor={primaryColor}
                >
                  React playground
                </StyledButton>
                <StyledButton
                  onClick={() => gotoSkills(scrollArea)}
                  activeColor={primaryColor}
                >
                  Blog
                </StyledButton>
              </ButtonsWrapper>
            </AboutContentWrapper>
          </Measure>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
