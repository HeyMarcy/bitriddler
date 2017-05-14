import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'utils/styled-components';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import { getLineSecondPoint, addPoints } from 'utils/math';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// Calculate second point
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #900;
`;

const Skill = styled(FloatingActionButton)`
  position: absolute;
  left: ${(props) => props.point.x - props.width / 2}px;
  top: ${(props) => props.point.y - props.height / 2}px;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export default class Cloud extends React.Component {

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    radius: React.PropTypes.number,
  };

  static defaultProps = {
    // Material ui floating button width
    width: 56,
    height: 56,
    radius: 300,
  };

  getCenterPoint = () => ({
    x: getWindowWidth() / 2,
    y: getWindowHeight() / 2,
  });

  getPoint = (angle, radius) => getLineSecondPoint(this.getCenterPoint(), angle, radius);

  getDefaultStyle = () => ({
    radius: 0,
  });

  getStyle = () => ({
    radius: spring(this.props.radius),
  });

  render() {
    const {
      skills,
      width,
      height,
    } = this.props;

    return (
      <Motion
        defaultStyle={this.getDefaultStyle()}
        style={this.getStyle()}
      >
        {({ radius }) => (
          <Wrapper
            rotate={radius}
          >
            {skills.map((skill, index) => (
              <Skill
                width={width}
                height={height}
                radius={radius}
                point={this.getPoint(index * (360 / skills.length), radius)}
              >
                {skill.tool.name}
              </Skill>
            ))}
          </Wrapper>
        )}
      </Motion>
    );
  }
}
