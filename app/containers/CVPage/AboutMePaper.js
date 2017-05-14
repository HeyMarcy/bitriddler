import React from 'react';
import styled from 'utils/styled-components';

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  background: url('${(props) => props.image}');
  background-size: cover;
  background-position: center center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const DisplayName = styled.h2`
  font-size: 1.7em;
  text-transform: uppercase;
  margin-bottom: 0px;
`;

const CurrentJobTitle = styled.h4`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.3em;
  color: ${(props) => props.color};
`;

const Summary = styled.p`
`;

const AboutMePaper = ({ about, jobTitleFontColor }) => (
  <AboutWrapper>
    <ProfileImageWrapper>
      <ProfileImage
        image={about.profileImage}
      />
    </ProfileImageWrapper>
    <DisplayName>{about.fullName}</DisplayName>
    <CurrentJobTitle color={jobTitleFontColor}>{about.primaryRole}</CurrentJobTitle>
    <Summary>
      {about.summary}
    </Summary>
  </AboutWrapper>
);

AboutMePaper.propTypes = {
};

export default AboutMePaper;
