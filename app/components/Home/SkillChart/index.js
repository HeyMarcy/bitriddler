import React from 'react';
import { Bar as BarChart } from 'react-chartjs-2';
import { darken } from 'material-ui/utils/colorManipulator';
import { getWindowWidth, getWindowHeight } from 'utils/screen';
import SkillScore from './SkillScore';
import TitleIcon from 'react-icons/md/work';
import CheckIcon from 'react-icons/md/check';
import styled from 'styled-components';
import {
  grey200,
  grey500,
  grey900,
  grey700,
  blue600,
  black,
} from 'material-ui/styles/colors';
import sortBy from 'lodash/sortBy';

const percentageToColor = val => {
  if(val > 90) {
    return black;
  }
  if(val > 70) {
    return grey900;
  }
  if(val > 50) {
    return grey500;
  }
  return grey200;
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 2em;
  margin-right: 10px;
`;

const TitleText = styled.h3`
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const SkillsColumn = styled.div`
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ColumnTitle = styled.h4`
`;

const Skill = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const SkillName = styled.div`
  width: 100px;
  margin-left: 10px;
`;

const SkillScoreText = styled.div`
  color: ${(props) => percentageToColor(props.percentage)};
  margin-left: 10px;
`;

export default class SkillChart extends React.Component {

  getFrontendSkills = (skills) => sortBy(skills.filter(skill => skill.tool.type === 'frontend'), [ 'scorePercentage' ]).reverse();
  getBackendSkills = (skills) => sortBy(skills.filter(skill => skill.tool.type === 'backend'), [ 'scorePercentage' ]).reverse();
  getDatabaseSkills = (skills) => sortBy(skills.filter(skill => skill.tool.type === 'database'), [ 'scorePercentage' ]).reverse();
  getManagementSkills = (skills) => sortBy(skills.filter(skill => skill.tool.type === 'management'), [ 'scorePercentage' ]).reverse();

  render() {
    const {
      skills,
    } = this.props;

    return (
      <Wrapper>
        <Title>
          <TitleText>
            Skills
          </TitleText>
        </Title>
        <SkillsWrapper>
          <SkillsColumn>
            <ColumnTitle>Front-end</ColumnTitle>
            {this.getFrontendSkills(skills).map((skill, index) => (
              <Skill key={index}>
                <CheckIcon />
                <SkillName>{skill.tool.name}</SkillName>
                <SkillScore
                  percentage={skill.scorePercentage}
                />
                <SkillScoreText
                  percentage={skill.scorePercentage}
                >{skill.scorePercentage}%</SkillScoreText>
              </Skill>
            ))}
          </SkillsColumn>
          <SkillsColumn>
            <ColumnTitle>Back-end</ColumnTitle>
            {this.getBackendSkills(skills).map((skill, index) => (
              <Skill key={index}>
                <CheckIcon />
                <SkillName>{skill.tool.name}</SkillName>
                <SkillScore
                  percentage={skill.scorePercentage}
                />
                <SkillScoreText
                  percentage={skill.scorePercentage}
                >{skill.scorePercentage}%</SkillScoreText>
              </Skill>
            ))}
          </SkillsColumn>
          <SkillsColumn>
            <ColumnTitle>Database</ColumnTitle>
            {this.getDatabaseSkills(skills).map((skill, index) => (
              <Skill key={index}>
                <CheckIcon />
                <SkillName>{skill.tool.name}</SkillName>
                <SkillScore
                  percentage={skill.scorePercentage}
                />
                <SkillScoreText
                  percentage={skill.scorePercentage}
                >{skill.scorePercentage}%</SkillScoreText>
              </Skill>
            ))}
          </SkillsColumn>
        </SkillsWrapper>
      </Wrapper>
    );
  }
}
