import React from 'react';
import styled from 'utils/styled-components';
import chunk from 'lodash/chunk';
import SkillScore from './SkillScore';

const SkillsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: -${(props) => props.verticalPadding / 2}px;
  margin-bottom: -${(props) => props.verticalPadding / 2}px;
`;

const SkillColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkillWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.verticalPadding / 2}px;
  margin-bottom: ${(props) => props.verticalPadding / 2}px;
`;

const SkillTitle = styled.h5`
  margin: 0;
  flex-basis: 30%;
  margin-right: 10px;
`;

const SkillsPaper = ({ skills, numberOfColumns = 1, activeColor, inactiveColor, verticalPadding, ...props }) => (
  <SkillsWrapper verticalPadding={verticalPadding}>
    {chunk(skills, skills.length / numberOfColumns).map((column, i) => (
      <SkillColumn key={i}>
        {column.map((skill, j) => (
          <SkillWrapper
            verticalPadding={8}
            isFirst={j === 0}
            isLast={j === column.length - 1}
            key={j}
          >
            <SkillTitle>
              {skill.tool.name}
            </SkillTitle>
            <SkillScore
              inactiveColor={inactiveColor}
              activeColor={activeColor}
              percentage={skill.scorePercentage}
            />
          </SkillWrapper>
        ))}
      </SkillColumn>
    ))}
  </SkillsWrapper>
);

SkillsPaper.propTypes = {
};

export default SkillsPaper;
