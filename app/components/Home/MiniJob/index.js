import React from 'react';
import styled from 'styled-components';
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
  font-size: 1em;
`;

const JobSubtitle = styled.span`
  color: ${lightWhite};
  font-size: 0.8em;
`;

const JobTools = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const JobTool = styled.span`
  font-size: 0.8em;
  background: ${white};
  flex-shrink: 0;
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
