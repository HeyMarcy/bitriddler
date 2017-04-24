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
import code1 from './code1';
import code2 from './code2';

const stringifyTranslate = ({ x, y, z }) => `transform: perspective(100px) translate3d(${x}px, ${y}px, ${z}px);`;

const Wrapper = styled.div`
  background: ${(props) => props.primaryColor};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const CodeBreakersWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.1;
  display: flex;
`;

const CodeBreakerWrapper = styled.div`
  width: 50%;
  border-right: 3px solid #333;
`;

const InnerWrapper = styled.div`
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

const LineAnimationWrapper = styled.div`
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

  renderLineAnimations({ contentWidth, contentHeight, stopAnimation }) {
    const padding = 60;
    const horizontalSpace = getWindowWidth() / 2 - contentWidth / 2 - padding;
    const verticalSpace = getWindowHeight() / 2 - contentHeight / 2 - padding;
    const constWidth = contentWidth;
    const constHeight = contentHeight;
    const thickness = 1;
    const color = lightWhite;
    const waitFor = 100;
    const repeatInterval = 10000;

    return [
      // Top and bottom
      <LineAnimation
        waitFor={waitFor}
        color={color}
        thickness={thickness}
        key={1}
        initial={{ y: getWindowHeight() / 2 }}
        animations={[
          { distance: getWindowWidth() },
          { y: verticalSpace },
          { x: getWindowWidth() / 2 - constWidth / 2, distance: constWidth },
          { x: getWindowWidth() / 2 - constWidth / 2 - contentWidth },
          { x: getWindowWidth() / 2 - constWidth / 2 + contentWidth },
          { x: getWindowWidth() / 2 - constWidth / 2 - contentWidth },
        ]}
      />,
      <LineAnimation
        waitFor={waitFor}
        color={color}
        thickness={thickness}
        key={4}
        initial={{ y: getWindowHeight() / 2}}
        animations={[
          { distance: getWindowWidth() },
          { y: getWindowHeight() - verticalSpace },
          { x: getWindowWidth() / 2 - constWidth / 2, distance: constWidth },
          { x: getWindowWidth() / 2 - constWidth / 2 + contentWidth },
          { x: getWindowWidth() / 2 - constWidth / 2 - contentWidth },
          { x: getWindowWidth() / 2 - constWidth / 2 + contentWidth },
        ]}
      />,
      // Left and right
      <LineAnimation
        waitFor={waitFor}
        color={color}
        thickness={thickness}
        key={2}
        initial={{ x: getWindowWidth() / 2, angle: 90 }}
        animations={[
          { distance: getWindowHeight() },
          { x: horizontalSpace },
          { y: getWindowHeight() / 2 - constHeight / 2, distance: constHeight },
          { y: getWindowHeight() / 2 - constHeight / 2 - contentHeight },
          { y: getWindowHeight() / 2 - constHeight / 2 + contentHeight },
          { y: getWindowHeight() / 2 - constHeight / 2 - contentHeight },
        ]}
      />,
      <LineAnimation
        waitFor={waitFor}
        color={color}
        thickness={thickness}
        key={3}
        initial={{ x: getWindowWidth() / 2, angle: 90 }}
        animations={[
          { distance: getWindowHeight() },
          { x: getWindowWidth() - horizontalSpace },
          { y: getWindowHeight() / 2 - constHeight / 2, distance: constHeight },
          { y: getWindowHeight() / 2 - constHeight / 2 + constHeight },
          { y: getWindowHeight() / 2 - constHeight / 2 - constHeight },
          { y: getWindowHeight() / 2 - constHeight / 2 + constHeight },
        ]}
      />,
    ];
  }

  render() {
    const {
      gotoBlackcrows,
      primaryColor,
      scrollValue,
    } = this.props;

    const {
      contentWidth,
      contentHeight,
    } = this.state;

    const {
      scrollArea,
    } = this.context;

    const stopAnimation = scrollValue > getWindowHeight() / 2;

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
              </ButtonsWrapper>
            </AboutContentWrapper>
          </Measure>
        </InnerWrapper>
        {this.renderLineAnimations({ contentWidth, contentHeight, stopAnimation })}
        <CodeBreakersWrapper>
          <CodeBreakerWrapper>
            <CodeBreaker code={code1} />
          </CodeBreakerWrapper>
          <CodeBreakerWrapper>
            <CodeBreaker code={code2} />
          </CodeBreakerWrapper>
        </CodeBreakersWrapper>
      </Wrapper>
    );
  }
}
