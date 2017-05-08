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

export default class EntranceAnimation extends React.Component {

  static propTypes = {
    startAnimation: PropTypes.bool,
    onFinish: PropTypes.func,
  };

  componentWillMount() {
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
    if(nextProps.startAnimation && !this.props.startAnimation) {
      this.runLinesEnterAnimations(nextProps);
    }
  }

  runLinesEnterAnimations = () => {
    this.setState({
      lineAnimations: this.getStartAnimations()
    });
  }

  openTopWall = () => this.setState({ openTopWall: true })

  // Top bottom, left right
  getInitialLinesPosition = () => ([
    { opacity: 0, y: getWindowHeight() / 2, x: getWindowWidth() / 2, distance: 0 },
  ]);

  getStartAnimations = () => {
    return [
      [
        { opacity: 1, distance: getWindowWidth(), x: 0, onFinish: this.openTopWall },
        { y: 0 },
      ],
    ];
  }

  renderLineAnimations({ initialLinesPosition, lineAnimations, lineColor }) {
    const waitFor = 500;

    return initialLinesPosition.map((initialPosition, index) => (
      <Line
        key={index}
        color={lineColor}
        waitFor={waitFor}
        initial={initialPosition}
        animations={lineAnimations[index]}
      />
    ));
  }

  render() {
    const {
      startAnimation,
      wallColor,
      lineColor,
      onFinish,
    } = this.props;

    const {
      openTopWall,
      initialLinesPosition,
      lineAnimations,
    } = this.state;

    return (
      <Wrapper>
        <BoxAnimation
          closeLeft={false}
          closeRight={false}
          closeBottom={false}
          closeTop={!openTopWall}
          primaryColor={wallColor}
          onRest={onFinish}
        />
        {
          this.renderLineAnimations({ initialLinesPosition, lineAnimations, lineColor })
        }
      </Wrapper>
    );
  }
}
