import React from 'react';
import styled from 'styled-components';

const EducationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EducationWrapper = styled.div`
  ${(props) => !props.isFirst && `margin-top: ${props.verticalPadding / 2}px;`}
  ${(props) => !props.isLast && `margin-bottom: ${props.verticalPadding / 2}px;`}
`;

const EducationTitle = styled.h3`
`;

const EducationLocation = styled.h4`
  color: ${(props) => props.color};
`;

const EducationDate = styled.h5`
  display: flex;
  color: ${(props) => props.color};
`;

const EducationDateFrom = styled.div`
`;

const EducationDateSeparator = styled.div`
  padding: 0 10px;
`;

const EducationDateTo = styled.div`
`;

const EducationsPaper = ({ educations, locationFontColor, dateFontColor, verticalPadding, ...props }) => (
  <EducationsWrapper>
    {educations.map((education, index) => (
      <EducationWrapper verticalPadding={verticalPadding} isFirst={index === 0} isLast={index === educations.length - 1} key={index}>
        <EducationTitle>
          {education.title}
        </EducationTitle>
        <EducationLocation color={locationFontColor}>
          {education.location}
        </EducationLocation>
        <EducationDate color={dateFontColor}>
          <EducationDateFrom>
            {education.dateFrom}
          </EducationDateFrom>
          <EducationDateSeparator>
            -
          </EducationDateSeparator>
          <EducationDateTo>
            {education.dateTo}
          </EducationDateTo>
        </EducationDate>
      </EducationWrapper>
    ))}
  </EducationsWrapper>
);

EducationsPaper.propTypes = {
};

export default EducationsPaper;
