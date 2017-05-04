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
import {
  isXLScreen,
  isLGScreen,
} from 'utils/screen';
import CheckIcon from 'react-icons/md/check';
import Button from 'components/Utils/Button';
import Wall from 'components/AI/Wall';
import Creature from 'components/AI/Creature';
import Line from 'components/LineAnimations/Line';
import BoxAnimation from 'components/Animations/BoxAnimation';
import Writer from 'components/Animations/Writer';
import FadeInBottom from 'components/Animations/FadeInBottom';
import SublimeHelper from 'components/Animations/SublimeHelper';
import ReactMarkdown from 'react-markdown';
import { media } from 'utils/styles';

const getLargeDesktopImageWidthPercentage = () => 60;
const getDesktopImageWidthPercentage = () => 50;
const getTabletImageWidthPercentage = () => 100;
const getMobileImageWidthPercentage = () => 100;

export const getImageWidthPercentage = () => {
  if(isXLScreen()) {
    return getLargeDesktopImageWidthPercentage();
  }

  if(isLGScreen()) {
    return getDesktopImageWidthPercentage();
  }

  return getTabletImageWidthPercentage();
}

const Wrapper = styled.div`
  background: ${(props) => props.primaryColor};
  height: 100vh;
  ${media.md`
    height: auto;
  `}
`;

const InnerWrapper = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.isLeft ? `row` : 'row-reverse'};
  padding: 0px 24px;
  max-width: 1400px;

  ${media.md`
    flex-direction: column-reverse;
    padding: 24px;
    height: auto;
  `}
`;

const CoverImage = styled.div`
  width: ${getLargeDesktopImageWidthPercentage()}%;
  height: 100vh;
  ${media.lg`
    width: ${getDesktopImageWidthPercentage()}%;
  `}
  ${media.md`
    width: 100%;
    height: 60vh;
  `}
  background: url(${(props) => props.image});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const JobDetails = styled(FadeInBottom)`
  width: ${98 - getLargeDesktopImageWidthPercentage()}%;
  max-height: 93vh;
  ${media.lg`
    width: ${98 - getDesktopImageWidthPercentage()}%;
  `}
  ${media.md`
    height: auto;
    width: 100%;
    max-height: initial;
  `}
  overflow: hidden;
  color: ${(props) => props.fontColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
`;

const JobSubtitle = styled.h3`
  color: ${(props) => props.fontColor};
`;

const JobSectionTitle = styled.h4`
`;

const JobToolsWrapper = styled.div`
  display: flex;
  font-size: 0.9em;
`;

const JobToolLogoWrapper = styled.h5`
  margin-right: 10px;
  background: ${(props) => props.fontColor};
  color: ${(props) => props.primaryColor};
  padding: 8px 10px;
`;

const JobRoles = styled.ul`
  list-style: none;
`;

const JobRole = styled.li`
  padding-left: 0;
  color: ${(props) => props.fontColor};
  display: flex;
`;

const JobRoleCheck = styled(CheckIcon)`
  margin-right: 10px;
  height: 100%;
`;

const JobRoleText = styled.span`
`;

const JobStory = styled.div`
  color: ${(props) => props.fontColor};
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

  addDot = (str) => str.indexOf('.') < str.length - 1 ? `${str}.` : `${str}`;

  render() {
    const {
      primaryColor,
      job,
      isLeft,
      noAnimation,
    } = this.props;

    const {
      startAnimation,
    } = this.state;

    const fontColor = job.fontColor;

    return (
      <Wrapper
        primaryColor={primaryColor}
      >
        <InnerWrapper isLeft={isLeft}>
          <JobDetails
            fontColor={fontColor}
            fromLeft={isLeft}
            start={startAnimation}
            disable={noAnimation}
          >
            <JobHeading>
              <JobLogo src={job.logo} />
              <JobHeadingRight>
                <JobTitle>
                  {job.title}
                </JobTitle>
                <JobSubtitle fontColor={fontColor}>
                  {job.subtitle}
                </JobSubtitle>
              </JobHeadingRight>
            </JobHeading>
            <JobSectionTitle>
              Roles
            </JobSectionTitle>
            <JobRoles>
              {job.roles.map((role, index) => (
                <JobRole fontColor={fontColor} key={index}>
                  <JobRoleCheck />
                  <JobRoleText>{this.addDot(role)}</JobRoleText>
                </JobRole>
              ))}
            </JobRoles>
            {
              job.story &&
              <JobSectionTitle>
                Story
              </JobSectionTitle>
            }
            {
              job.story &&
              <JobStory fontColor={fontColor}>
                <ReactMarkdown source={job.story} />
              </JobStory>
            }
            <JobSectionTitle>
              Tools
            </JobSectionTitle>
            <JobToolsWrapper>
              {job.tools.map(({ logo, name }, index) => (
                <JobToolLogoWrapper
                  fontColor={fontColor}
                  primaryColor={primaryColor}
                  key={index}
                >
                  {name}
                </JobToolLogoWrapper>
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
