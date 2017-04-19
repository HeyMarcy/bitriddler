import React from 'react';
import Measure from 'react-measure';
import { StaggeredMotion, spring } from 'react-motion';
import styled from 'styled-components';
import {
  fullWhite,
  darkWhite,
  lightWhite,
} from 'material-ui/styles/colors';
import Button from 'components/Utils/Button';
import ProfileCircle from '../ProfileCircle';

const stringifyTranslate = ({ x, y, z }) => `transform: perspective(100px) translate3d(${x}px, ${y}px, ${z}px);`;

const Wrapper = styled.div`
  background: ${(props) => props.primaryColor};
`;

const InnerWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;

const RightWrapper = styled.div`
  width: 60%;
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

const StartJourney = styled(Button)`
  margin-top: 10px;
`;

export default class About extends React.Component {
  static propTypes = {
    startJourney: React.PropTypes.func,
  };

  static contextTypes = {
    scrollArea: React.PropTypes.object,
  };

  getDefaultStyles = () => ([
    { animateTo: 0 },
    { animateTo: 0 },
    { animateTo: 0 },
  ]);

  getNextFrameStyles = () => (prevStyles) => ([
    { animateTo: spring(1) },
    { animateTo: spring(prevStyles[0].animateTo) },
    { animateTo: spring(prevStyles[1].animateTo) },
  ]);

  startJourney(scrollTo) {
    this.context.scrollArea.scrollYTo(scrollTo);
  }

  render() {
    const {
      startJourney,
      scrollTo,
      primaryColor,
    } = this.props;

    return (
      <Wrapper primaryColor={primaryColor}>
        <InnerWrapper>
          <LeftWrapper>
          </LeftWrapper>
          <StaggeredMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getNextFrameStyles()}
          >
            {( styles ) => (
              <RightWrapper>
                <Title animateTo={styles[0].animateTo}>
                  Kareem Mohamed,
                </Title>
                <Subtitle animateTo={styles[1].animateTo}>
                  Front-end / UI Developer
                </Subtitle>
                <Description animateTo={styles[2].animateTo}>
                  Hi. I produce elegant, performant, and accessible digital experiences. Currently working at Blackcrows, FR.
                </Description>
                <StartJourney
                  onClick={() => this.startJourney(scrollTo)}
                  activeColor={primaryColor}
                >
                  Start the journey
                </StartJourney>
              </RightWrapper>
            )}
          </StaggeredMotion>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
