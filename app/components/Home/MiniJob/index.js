import React from 'react';
import styled from 'utils/styled-components';
import {
  white,
  lightWhite,
} from 'material-ui/styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobTitle = styled.span`
  color: ${white};
`;

const JobSubtitle = styled.span`
  color: ${lightWhite};
`;

const JobTools = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const JobTool = styled.span`
  background: ${white};
  padding: 2px 5px;
  margin-right: 5px;
`;

export default ({ job, ...props }) => (
  <Wrapper {...props}>
    <JobTitle>
      {job.title}
    </JobTitle>
    <JobSubtitle>
      {job.subtitle}
    </JobSubtitle>
    <JobTools>
      {job.tools.map((tool, j) => (
        <JobTool key={j}>
          {tool.name}
        </JobTool>
      ))}
    </JobTools>
  </Wrapper>
);
