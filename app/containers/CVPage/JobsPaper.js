import React from 'react';
import CheckIcon from 'react-icons/md/check';
import styled from 'utils/styled-components';
import { fade } from 'material-ui/utils/colorManipulator';
import Fonts from './Base/Fonts';
import spacing from './Base/spacing';

const VERTICAL_PADDING = spacing.jobs.verticalPadding;

const JobsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobWrapper = styled.div`
  ${(props) => !props.isFirst && `margin-top: ${props.verticalPadding / 2}px;`}
  ${(props) => !props.isLast && `margin-bottom: ${props.verticalPadding / 2}px;`}
`;

const JobTitle = styled(Fonts.H3)`
  margin: 0;
`;

const JobDate = styled(Fonts.H5)`
  margin: 0;
  display: flex;
  color: ${(props) => props.color};
`;

const JobDateFrom = styled.div`
`;

const JobDateSeparator = styled.div`
  padding: 0 ${spacing.jobs.datePadding}px;
`;

const JobDateTo = styled.div`
`;

const JobSummary = styled(Fonts.P)`
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

const JobRoles = styled.ul`
  margin: 0;
  list-style: none;
`;

const JobRole = styled.li`
  padding-left: 0;
  display: flex;
  align-items: flex-start;
  margin: 0;
  color: ${(props) => props.color};
`;

const JobRoleCheck = styled.div`
  margin-right: ${spacing.jobs.checkPadding}px;
`;

const JobRoleText = styled(Fonts.P)`
  margin: 0;
`;

const JobToolsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${spacing.jobs.toolsTopMargin}px;
`;

const JobToolLogoWrapper = styled(Fonts.P)`
  margin: 0;
  margin-right: ${spacing.jobs.toolRightMargin}px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  padding: 2px 5px;
`;

const addDot = (str) => str.indexOf('.') < str.length - 1 ? `${str}.` : `${str}`;

const JobsPaper = ({ useSummary = false, jobs, rolesFontColor, dateFontColor, toolBgColor, toolFontColor, ...props }) => (
  <JobsWrapper>
    {jobs.map((job, index) => (
      <JobWrapper verticalPadding={VERTICAL_PADDING} isFirst={index === 0} isLast={index === jobs.length - 1} key={index}>
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
                  <CheckIcon size={12} />
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
