import React from 'react';
import styled from 'styled-components';

const calculateTranslateX = ({ from, distance, angle }) => from.x - .5 * distance * (1 - Math.cos(angle));
const calculateTranslateY = ({ from, distance, angle }) => from.y + .5 * distance * Math.sin(angle);

const Line = styled.div`
  position: absolute;
  transform: ${({ from, angle, distance }) => `
    translate(${calculateTranslateX({ from, angle, distance })}px, ${calculateTranslateY({ from, angle, distance })}px) rotate(${angle}rad)
  `};
  width: ${(props) => props.distance}px;
  height: 0px;
  border-bottom: ${(props) => props.thickness}px solid ${(props) => props.color};
`;

Line.propTypes = {
  from: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  }),
  angle: React.PropTypes.number,
  distance: React.PropTypes.number,
  color: React.PropTypes.string,
  thickness: React.PropTypes.number,
};

export default Line;
