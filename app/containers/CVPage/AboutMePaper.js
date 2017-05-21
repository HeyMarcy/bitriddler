import React from 'react';
import styled from 'utils/styled-components';
import Fonts from './Base/Fonts';
import spacing from './Base/spacing';

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
  width: ${spacing.about.imageSize}px;
  height: ${spacing.about.imageSize}px;
  border-radius: 50%;
  margin-bottom: ${spacing.about.imageBottomMargin}px;
`;

const DisplayName = styled(Fonts.H2)`
  margin: 0;
  text-transform: uppercase;
`;

const CurrentJobTitle = styled(Fonts.H4)`
  margin: 0;
  color: ${(props) => props.color};
`;

const Summary = styled(Fonts.P)`
  margin: 0;
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
