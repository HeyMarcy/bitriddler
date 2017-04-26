import React from 'react';
import { presets } from 'react-motion';
import Line from '../Line';
import {
  getWindowWidth,
  getWindowHeight,
} from 'utils/screen';


const getLoadingAnimations = () => {
  const leftX = 0;
  const leftDistance = 100;

  const rightX = getWindowWidth() - 200;
  const rightDistance = 200;

  const threshold = 0;

  return [
    { x: leftX, distance: leftDistance, restOn: ({ x }) => x < (leftX  + threshold) },
    { opacity: 0, x: rightX, distance: rightDistance, restOn: ({ x }) => x > (rightX - threshold) },
  ];
};

const getRestAnimations = ({ onRest }) => ([
  { x: 0, distance: getWindowWidth(), opacity: 1, onFinish: onRest },
]);

export default ({ initialDistance, rest, onRest }) => {
  return (
    <Line
      initial={{
        x: getWindowWidth() / 2 - initialDistance / 2,
        y: getWindowHeight() / 2,
        distance: initialDistance,
      }}
      animations={rest ? getRestAnimations({ onRest }) : getLoadingAnimations()}
      repeat
      springConfig={presets.stiff}
    />
  );
}
