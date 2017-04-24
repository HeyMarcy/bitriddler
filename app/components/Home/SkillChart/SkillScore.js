import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';
import {
  grey900,
  grey200,
} from 'material-ui/styles/colors';

const getMinValue = (val1, val2) => val1 < val2 ? val1 : val2;
const scorePointWidth = 10;
const margin = 8;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ScorePoint = styled.div`
  width: ${scorePointWidth}px;
  height: ${scorePointWidth}px;
  margin-left: ${margin / 2}px;
  margin-right: ${margin / 2}px;
  background: ${grey200};
`;

const InnerScorePoint = styled.div`
  width: 0;
  ${(props) => props.fillPercentage > 0 && `width: ${(props.fillPercentage * scorePointWidth) / 100}px;`}
  height: ${scorePointWidth}px;
  background: ${grey900};
`;

const SkillScore = ({ percentage, ...props }) => (
  <Wrapper {...props}>
    {range(10).map((val, index) => (
      <ScorePoint
        key={index}
      >
        <InnerScorePoint
          fillPercentage={getMinValue(percentage - val * 10, 10) * 10}
        />
      </ScorePoint>
    ))}
  </Wrapper>
);

SkillScore.propTypes = {
  percentage: React.PropTypes.number,
};

export default SkillScore;
