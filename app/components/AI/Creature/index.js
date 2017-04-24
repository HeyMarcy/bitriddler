import React from 'react';
import styled from 'styled-components';
import { lineIntersectsRectange, toRadians, getLineSecondPoint, addPoints } from 'utils/math';
import {
  fullWhite,
  darkWhite,
  lightWhite,
} from 'material-ui/styles/colors';
import Line from 'components/Shape/Line';

// Configurations
const deviationAngle = 25;
const distance = 100;
const boxWidth = 10;
const boxColor = '#333';
const lineColor = '#333';
const lineDangerColor = '#900';

const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
`;

const Box = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  transform: rotate(${(props) => props.rotation}deg);
  background: ${boxColor};
`;

export default class Creature extends React.Component {
  static propTypes = {
    walls: React.PropTypes.arrayOf(React.PropTypes.shape({
      top: React.PropTypes.number,
      left: React.PropTypes.number,
      width: React.PropTypes.number,
      height: React.PropTypes.number,
    })).isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  };

  checkIntersectsAnyWall = (p1, p2, walls) => walls.some((wall) => lineIntersectsRectange(p1, p2, wall));

  getLine = ({ basePoint, deviationAngle, creatureRotationAngle, distance, walls }) => {
    const p2 = getLineSecondPoint(basePoint, creatureRotationAngle + deviationAngle, distance);
    const isDanger = this.checkIntersectsAnyWall(basePoint, p2, walls);

    return (
      <Line
        from={basePoint}
        angle={toRadians(creatureRotationAngle + deviationAngle)}
        distance={distance}
        color={isDanger ? lineDangerColor : lineColor}
      />
    );
  }

  componentWillMount() {
    this.initialAnimate();
    setInterval(this.animate, 100);
  }

  initialAnimate = () => {
    this.setState({
      x: 0,
      y: 0,
      creatureRotationAngle: 0,
    });
  }

  animate = () => {
    this.setState({
      x: this.state.x + 1,
      y: this.state.y + 1,
      creatureRotationAngle: this.state.creatureRotationAngle + 10,
    });
  }

  render() {
    const {
      walls,
      primaryColor,
      ...props,
    } = this.props;

    const {
      x,
      y,
      creatureRotationAngle,
    } = this.state;

    const getLine = (deviationAngle) => this.getLine({
      basePoint: { x: x + 5, y: y + 5 },
      deviationAngle,
      creatureRotationAngle,
      distance,
      walls,
    });

    return (
      <Wrapper {...props}>
        {getLine(360 - deviationAngle * 2)}
        {getLine(360 - deviationAngle)}
        {getLine(0)}
        {getLine(0 + deviationAngle)}
        {getLine(0 + deviationAngle * 2)}
        <Box
          x={x}
          y={y}
          rotation={creatureRotationAngle}
          width={boxWidth}
        />
      </Wrapper>
    );
  }
}
