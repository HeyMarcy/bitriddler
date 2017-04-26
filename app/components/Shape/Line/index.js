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
  top: 0;
  left: 0;
`;

export default ({ x, y, color, thickness = 1, angle, distance }) => {
  const position = calculatePosition({ x, y, angle, distance });

  return (
    <StyledSvg height={getWindowHeight()} width={getWindowWidth()}>
      <line
        x1={x}
        y1={y}
        x2={position.x}
        y2={position.y}
        style={{
          stroke: color,
          strokeWidth: thickness,
        }}
      />
    </StyledSvg>
  );
};
