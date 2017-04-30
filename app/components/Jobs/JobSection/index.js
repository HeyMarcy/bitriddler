import React from 'react';
import Measure from 'react-measure';
import { StaggeredMotion, spring } from 'react-motion';
import styled from 'styled-components';
import {
  fullWhite,
  darkWhite,
  lightWhite,
  grey300,
} from 'material-ui/styles/colors';
import CheckIcon from 'react-icons/md/check';
import Button from 'components/Utils/Button';
import Wall from 'components/AI/Wall';
import Creature from 'components/AI/Creature';
import Line from 'components/LineAnimations/Line';
import BoxAnimation from 'components/Animations/BoxAnimation';
import Writer from 'components/Animations/Writer';
import FadeInBottom from 'components/Animations/FadeInBottom';
import SublimeHelper from 'components/Animations/SublimeHelper';

const Wrapper = styled.div`
  background: ${(props) => props.primaryColor};
`;

const InnerWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => props.isLeft ? `row` : 'row-reverse'};
  padding: 0px 24px;
  max-width: 1400px;
`;

const CoverImage = styled.div`
  width: 45%;
  background: url(${(props) => props.image});
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
`;

const JobDetails = styled(FadeInBottom)`
  height: 100vh;
  width: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const JobHeading = styled.div`
  display: flex;
  align-items: center;
`;

const JobHeadingRight = styled.div`
`;

const JobLogo = styled.img`
  height: 60px;
  margin-right: 10px;
`;

const JobTitle = styled.h2`
  margin-top: 12px;
`;

const JobSubtitle = styled.h3`
  font-size: 1.6em;
  color: ${lightWhite};
`;

const JobSectionTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const JobToolsWrapper = styled.div`
  display: flex;
`;

const JobToolLogo = styled.img`
  max-height: 32px;
  margin-left: 10px;
`;

const JobRoles = styled.ul`
  list-style: none;
`;

const JobRole = styled.li`
  padding-left: 0;
  font-size: 1em;
  color: ${grey300};
  display: flex;
`;

const JobRoleCheck = styled(CheckIcon)`
  margin-right: 10px;
  height: 100%;
`;

const JobRoleText = styled.span`
`;

const JobStory = styled.p`
  font-size: 1em;
  line-height: 24px;
  color: ${grey300};
`;

export default class JobSection extends React.Component {
  componentWillMount() {
    const {
      job,
      onReady,
    } = this.props;

    this.loadCoverImage(job, onReady);

    this.setState({
      startAnimation: this.props.startAnimation,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.startAnimation && !this.state.startAnimation) {
      this.setState({
        startAnimation: true,
      });
    }
  }

  loadCoverImage = (job, onReady) => {
    const image = new Image();
    image.src = job.cover;
    image.onload = onReady;
  }

  delay = (later) => () => setTimeout(later, 500);

  render() {
    const {
      primaryColor,
      job,
      isLeft,
    } = this.props;

    const {
      startAnimation,
    } = this.state;

    return (
      <Wrapper
        primaryColor={primaryColor}
      >
        <InnerWrapper isLeft={isLeft}>
          <JobDetails
            fromLeft={isLeft}
            start={startAnimation}
          >
            <JobHeading>
              {/*<JobLogo src={job.logo} />*/}
              <JobHeadingRight>
                <JobTitle>
                  {job.title}
                </JobTitle>
                <JobSubtitle>
                  {job.subtitle}
                </JobSubtitle>
              </JobHeadingRight>
            </JobHeading>
            <JobSectionTitle>
              Roles
            </JobSectionTitle>
            <JobRoles>
              {job.roles.map((role, index) => (
                <JobRole key={index}>
                  <JobRoleCheck />
                  <JobRoleText>{role}</JobRoleText>
                </JobRole>
              ))}
            </JobRoles>
            <JobSectionTitle>
              Story
            </JobSectionTitle>
            <JobStory>
              {job.story}
            </JobStory>
            <JobSectionTitle>
              Tools
            </JobSectionTitle>
            <JobToolsWrapper>
              {job.tools.map(({ logo }, index) => (
                <JobToolLogo key={index} src={logo} />
              ))}
            </JobToolsWrapper>
          </JobDetails>
          <CoverImage
            image={job.cover}
          />
        </InnerWrapper>
      </Wrapper>
    );
  }
}
