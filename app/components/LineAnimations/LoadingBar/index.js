import React from 'react';
import { presets } from 'react-motion';
import Line from '../Line';
import {
  getWindowWidth,
  getWindowHeight,
} from 'utils/screen';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;


const getLoadingAnimations = () => {
  const leftX = 0;
  const leftDistance = 100;

  const rightX = getWindowWidth() - 200;
  const rightDistance = 200;

  const threshold = getWindowWidth() / 4;

  return [
    { x: leftX, distance: leftDistance, restOn: ({ x }) => x < (leftX  + threshold) },
    { x: rightX, distance: rightDistance, restOn: ({ x }) => x > (rightX - threshold) },
  ];
};

const getRestAnimations = ({ onRest }) => ([
  { x: getWindowWidth() / 2, distance: 0, opacity: 1, onFinish: onRest, restOn: 'distance' },
]);

export default ({ initialDistance, rest, onRest }) => {
  return (
    <Wrapper>
      <div>Loading....</div>
      <Line
        thickness={2}
        initial={{
          x: getWindowWidth() / 2 - initialDistance / 2,
          y: getWindowHeight() / 2,
          distance: initialDistance,
        }}
        animations={rest ? getRestAnimations({ onRest }) : getLoadingAnimations()}
        repeat
        springConfig={presets.noWobble}
      />
    </Wrapper>
  );
}
