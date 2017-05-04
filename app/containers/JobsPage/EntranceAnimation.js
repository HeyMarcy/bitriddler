import React from 'react';
import {
  getWindowWidth,
  getWindowHeight,
} from 'utils/screen';
import styled from 'styled-components';
import BoxAnimation from 'components/Animations/BoxAnimation';
import Line from 'components/LineAnimations/Line';

const AnimationWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
`;

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

  getCoverImageStartingX = () => getWindowWidth() * ((100 - this.props.imageWidthPercentage) / 100);

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
      imageWidthPercentage,
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
          rightWidth={imageWidthPercentage}
        />
        {this.renderLineAnimations({ initialLinesPosition, lineAnimations })}
      </AnimationWrapper>
    );
  }
}
