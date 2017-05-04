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
  overflow: hidden;
  top: 0;
  left: 0;
`;

const COVER_IMAGE_WIDTH_PERCENTAGE = 60;

export default class EntranceAnimation extends React.Component {

  componentWillMount() {
    if(this.props.startAnimation) {
      this.startAnimation(this.props);
    } else {
      this.setState({
        openRightWall: false,
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

  getCoverImageStartingX = () => getWindowWidth() * ((100 - COVER_IMAGE_WIDTH_PERCENTAGE) / 100);

  startAnimation = (props) => {
    this.setState({
      openRightWall: false,
      initialLinesPosition: this.getInitialLinesPosition(props.loaderLineConfig),
      lineAnimations: this.getStartAnimations(),
    });
  }

  getInitialLinesPosition = () => ([
    {
      distance: getWindowWidth(),
      y: getWindowHeight() / 2,
    },
    {
      angle: 90,
      distance: 0,
      x: this.getCoverImageStartingX(),
    },
  ]);

  getStartAnimations = () => ([
    [
      {
        x: this.getCoverImageStartingX(),
        distance: 0,
      },
    ],
    [
      {
        y: getWindowHeight() / 2,
        restOn: ({ y }) => y > getWindowHeight() / 2 - 10,
      },
      {
        y: 0,
        opacity: 1,
        distance: getWindowHeight(),
        restOn: ({ distance }) => distance > getWindowHeight() - 10,
        onFinish: () => this.setState({ openRightWall: true }),
      },
      {
        x: getWindowWidth(),
        onFinish: this.props.onFinish,
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
      openRightWall,
    } = this.state;

    const {
      primaryColor,
      startAnimation,
      ...props,
    } = this.props;

    return (
      <AnimationWrapper {...props}>
        <BoxAnimation
          closeTop={false}
          closeBottom={false}
          closeLeft={false}
          closeRight={!openRightWall}
          primaryColor={primaryColor}
          rightWidth={COVER_IMAGE_WIDTH_PERCENTAGE}
        />
        {this.renderLineAnimations({ initialLinesPosition, lineAnimations })}
      </AnimationWrapper>
    );
  }
}
