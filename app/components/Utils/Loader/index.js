import React from 'react';
import colors from 'theme/colors';
import { Loader } from 'react-loaders';
import LeaveAnimation from './LeaveAnimation';
import 'loaders.css/src/animations/cube-transition.scss';

const LOADER_TYPE = 'cube-transition';

export default ({ color = colors.white, startLeaveAnimation, onLeave }) => (
  <LeaveAnimation onRest={onLeave} startAnimation={startLeaveAnimation}>
    <Loader type={LOADER_TYPE} active color={color} />
  </LeaveAnimation>
);
