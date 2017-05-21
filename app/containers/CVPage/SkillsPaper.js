import React from 'react';
import styled from 'utils/styled-components';
import chunk from 'lodash/chunk';
import SkillScore from './SkillScore';
import Fonts from './Base/Fonts';
import spacing from './Base/spacing';

const VERTICAL_PADDING = spacing.skills.verticalPadding;

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

const SkillTitle = styled(Fonts.H5)`
  margin: 0;
  flex-basis: 50%;
  margin-right: ${spacing.skills.titleRightMargin}px;
`;

const SkillColumnTitle = styled(Fonts.H5)`
  margin: 0;
  color: ${(props) => props.color};
`;

const SkillsPaper = ({ skills, columnTitleColor, numberOfColumns = 1, columnsTitles = [], activeColor, inactiveColor, ...props }) => (
  <SkillsWrapper verticalPadding={VERTICAL_PADDING}>
    {chunk(skills, skills.length / numberOfColumns).map((column, i) => (
      <SkillColumn key={i}>
        {
          columnsTitles[i] &&
          <SkillColumnTitle color={columnTitleColor}>{columnsTitles[i]}</SkillColumnTitle>
        }
        {column.map((skill, j) => (
          <SkillWrapper
            verticalPadding={VERTICAL_PADDING}
            isFirst={j === 0}
            isLast={j === column.length - 1}
            key={j}
          >
            <SkillTitle>
              {skill.tool ? skill.tool.name : skill.name}
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
