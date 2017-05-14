import React from 'react';
import { Motion, spring } from 'react-motion';
import MdUpIcon from 'react-icons/go/triangle-up';
import MdDownIcon from 'react-icons/go/triangle-down';
import styled from 'utils/styled-components';
import { black, white, darkWhite, grey200 } from 'material-ui/styles/colors';
import { getWindowHeight, getWindowWidth } from 'utils/screen';

const buttonColor = black;
const borderColor = grey200;

const width = 80;
const height = 80;

const getWidth = (animation) => animation * width;
const getHeight = (animation) => animation * height;

const ButtonWrapper = styled.div`
  width: ${(props) => getWidth(props.animation)}px;
  height: ${(props) => getHeight(props.animation)}px;
  transform: rotateZ(${(props) => props.animation * 5 * 180}deg);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: ${(props) => getWindowHeight() * props.index - getHeight(props.animation) / 2}px;
  left: ${(props) => getWindowWidth() / 2 - getWidth(props.animation) / 2}px;
  z-index: 10000000;
`;

const IconButton = styled.div`
  width: ${(props) => getWidth(props.animation)}px;
  height: ${(props) => getHeight(props.animation) / 2}px;
  display: flex;
  justify-content: center;
  font-size: 2em;
  font-weight: normal;
  color: ${white};
`;

const UpButton = styled(IconButton)`
  align-items: flex-end;
`;

const DownButton = styled(IconButton)`
  align-items: flex-start;
`;

export default ({ index = 1, startAnimation = true }) => (
  <Motion
    defaultStyle={{
      animation: 0,
    }}
    style={{
      animation: spring(startAnimation ? 1 : 0),
    }}
  >
    {({ animation }) => (
      <ButtonWrapper index={index} animation={animation}>
        <UpButton animation={animation}><MdDownIcon /></UpButton>
        <DownButton animation={animation}><MdUpIcon /></DownButton>
      </ButtonWrapper>
    )}
  </Motion>
);
