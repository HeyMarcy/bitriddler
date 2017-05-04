import React from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import {
  white,
  lightWhite,
  darkWhite,
  grey200,
} from 'material-ui/styles/colors';

const JobWrapper = styled.div`
  background: ${white};
  display: flex;
  flex-direction: row;
`;

const JobDetails = styled.div`
  padding: 12px 24px;
`;

const JobTitle = styled.h2`
`;

const JobSubtitle = styled.h3`
`;

const JobDescription = styled.p`
`;

const Arrow = styled.div`
  flex: 0 0 30px;
  height: ${(props) => props.height}px;
  background: ${darkWhite};
`;

const JobLeftArrow = styled(Arrow)`
  border-right: 1px solid ${grey200};
`;

const JobRightArrow = styled(Arrow)`
  border-left: 1px solid ${grey200};
`;

const JobDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobDetailsLeft = styled.div`
  flex-shrink: 0;
`;

const JobDetailsRight = styled.div`
  display: flex;
  align-items: center;
`;

const JobToolLogo = styled.img`
  max-height: 32px;
  margin-left: 10px;
`;

const JobRoles = styled.ul`

`;

const JobRole = styled.li`

`;

const Job = ({ job, primaryColor, onLeftArrowClick, onRightArrowClick, ...props }) => (
  <Measure whitelist={['height']}>
    {({ height }) => (
      <JobWrapper>
        <JobLeftArrow
          onClick={onLeftArrowClick}
          primaryColor={primaryColor}
          height={height}
        />
        <JobDetails>
          <JobDetailsHeader>
            <JobDetailsLeft>
              <JobTitle>{job.title}</JobTitle>
              <JobSubtitle>{job.subtitle}</JobSubtitle>
            </JobDetailsLeft>
            <JobDetailsRight>
              {job.tools.map(({ logo }, index) => (
                <JobToolLogo key={index} src={logo} />
              ))}
            </JobDetailsRight>
          </JobDetailsHeader>
          <JobRoles>
            {job.roles.map((role, index) => (
              <JobRole>{role}</JobRole>
            ))}
          </JobRoles>
        </JobDetails>
        <JobRightArrow
          onClick={onRightArrowClick}
          primaryColor={primaryColor}
          height={height}
        />
      </JobWrapper>
    )}
    </Measure>
);

Job.propTypes = {
};

export default Job;
