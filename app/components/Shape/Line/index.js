import React from 'react';
import styled from 'styled-components';
import {
  getWindowHeight,
  getWindowWidth,
} from 'utils/screen';

// const calculateTranslateX = ({ from, distance, angle }) => from.x - .5 * distance * (1 - Math.cos(angle));
// const calculateTranslateY = ({ from, distance, angle }) => from.y + .5 * distance * Math.sin(angle);

// const Line = styled.div`
//   position: absolute;
//   transform: ${({ from, angle, distance }) => `
//     translate(${calculateTranslateX({ from, angle, distance })}px, ${calculateTranslateY({ from, angle, distance })}px) rotate(${angle}rad)
//   `};
//   width: ${(props) => props.distance}px;
//   height: 0px;
//   border-bottom: ${(props) => props.thickness}px solid ${(props) => props.color};
// `;

// Line.propTypes = {
//   from: React.PropTypes.shape({
//     x: React.PropTypes.number.isRequired,
//     y: React.PropTypes.number.isRequired,
//   }),
//   angle: React.PropTypes.number,
//   distance: React.PropTypes.number,
//   color: React.PropTypes.string,
//   thickness: React.PropTypes.number,
// };

// export default Line;

const calculatePosition = ({ x, y, angle, distance }) => {
  return {
    x: x + Math.cos(angle) * distance,
    y: y + Math.sin(angle) * distance,
  };
}

const StyledSvg = styled.svg`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

export default ({ x, y, opacity = 1, color, thickness = 1, angle, distance }) => {
  const position = calculatePosition({ x, y, angle, distance });
  const x2 = position.x - x;
  const y2 = position.y - y;

  return (
    <StyledSvg x={x} y={y} height={y2 + 1} width={x2 + 1}>
      <line
        x1={0}
        y1={0}
        x2={x2}
        y2={y2}
        style={{
          opacity,
          stroke: color,
          strokeWidth: thickness,
        }}
      />
    </StyledSvg>
  );
};
