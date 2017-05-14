import React from 'react';
import styled from 'utils/styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
`;

const SkillWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #EEE;
  padding: 20px;
  flex-basis: 30%;
`;

const SkillToolsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SkillTool = styled.img`
  height: 30px;
`;

const SkillRating = styled.div`
`;

const SkillTitle = styled.div`
`;

export default class StackGrid extends React.Component {

  render() {
    const {
      stacks,
    } = this.props;

    return (
      <Wrapper>
        {stacks.map(({ title, tools, scorePercentage }, index) => (
          <SkillWrapper key={index}>
            <SkillToolsWrapper>
              {tools.map(({ logo }, index) => (
                <SkillTool key={index} src={logo} />
              ))}
            </SkillToolsWrapper>
          </SkillWrapper>
        ))}
      </Wrapper>
    );
  }
}
