import React from 'react';
import CheckIcon from 'react-icons/md/check';
import styled from 'utils/styled-components';
import { fade } from 'material-ui/utils/colorManipulator';

const JobsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobWrapper = styled.div`
  ${(props) => !props.isFirst && `margin-top: ${props.verticalPadding / 2}px;`}
  ${(props) => !props.isLast && `margin-bottom: ${props.verticalPadding / 2}px;`}
`;

const JobTitle = styled.h3`
`;

const JobDate = styled.h5`
  display: flex;
  color: ${(props) => props.color};
`;

const JobDateFrom = styled.div`
`;

const JobDateSeparator = styled.div`
  padding: 0 10px;
`;

const JobDateTo = styled.div`
`;

const JobSummary = styled.p`
  color: ${(props) => props.color};
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobHeaderLeft = styled.div`
`;

const JobHeaderRight = styled.div`
`;

const JobLogo = styled.img`
  height: 60px;
  margin-right: 10px;
`;

const JobRoles = styled.ul`
  list-style: none;
`;

const JobRole = styled.li`
  padding-left: 0;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
`;

const JobRoleCheck = styled.div`
  margin-right: 10px;
`;

const JobRoleText = styled.span`
`;

const JobToolsWrapper = styled.div`
  display: flex;
  font-size: 0.9em;
  flex-wrap: wrap;
`;

const JobToolLogoWrapper = styled.h5`
  margin-right: 10px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  padding: 4px 10px;
`;

const addDot = (str) => str.indexOf('.') < str.length - 1 ? `${str}.` : `${str}`;

const JobsPaper = ({ useSummary = false, jobs, rolesFontColor, dateFontColor, toolBgColor, toolFontColor, verticalPadding, ...props }) => (
  <JobsWrapper>
    {jobs.map((job, index) => (
      <JobWrapper verticalPadding={verticalPadding} isFirst={index === 0} isLast={index === jobs.length - 1} key={index}>
        <JobHeader>
          <JobHeaderLeft>
            <JobTitle>
              {job.subtitle} at {job.title}
            </JobTitle>
            <JobDate color={dateFontColor}>
              <JobDateFrom>
                {job.dateFrom}
              </JobDateFrom>
              <JobDateSeparator>
                -
              </JobDateSeparator>
              <JobDateTo>
                {job.dateTo}
              </JobDateTo>
            </JobDate>
          </JobHeaderLeft>
          <JobHeaderRight>
          </JobHeaderRight>
        </JobHeader>
        {
          useSummary ?
          <JobSummary>
            {job.summary}
          </JobSummary> :
          <JobRoles>
            {job.roles.map((role, index) => (
              <JobRole color={rolesFontColor} key={index}>
                <JobRoleCheck>
                  <CheckIcon size={16} />
                </JobRoleCheck>
                <JobRoleText>{addDot(role)}</JobRoleText>
              </JobRole>
            ))}
          </JobRoles>
        }
        <JobToolsWrapper>
          {job.tools.map(({ logo, name }, index) => (
            <JobToolLogoWrapper
              bgColor={toolBgColor}
              color={toolFontColor}
              key={index}
            >
              {name}
            </JobToolLogoWrapper>
          ))}
        </JobToolsWrapper>
      </JobWrapper>
    ))}
  </JobsWrapper>
);

JobsPaper.propTypes = {
};

export default JobsPaper;
