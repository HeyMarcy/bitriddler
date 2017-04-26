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
  getWindowWidth,
  getWindowHeight,
} from 'utils/screen';
import Button from 'components/Utils/Button';
import Wall from 'components/AI/Wall';
import Creature from 'components/AI/Creature';
import Line from 'components/LineAnimations/Line';
import BoxAnimation from 'components/Animations/BoxAnimation';
import Writer from 'components/Animations/Writer';
import SublimeHelper from 'components/Animations/SublimeHelper';

const stringifyTranslate = ({ x, y, z }) => `transform: perspective(100px) translate3d(${x}px, ${y}px, ${z}px);`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
`;
const CoverImage = styled.div`
  width: 50%;
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
`;

const JobDetails = styled.div`
  height: 100vh;
  width: 50%;
  color: white;
  padding: 12px 24px;
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
  margin-left: 10px;
`;

const JobRole = styled.li`
  list-style-position: outside;
  padding-left: 0;
  font-size: 1em;
  color: ${grey300};
`;

const JobStory = styled.p`
  font-size: 1em;
  line-height: 24px;
  color: ${grey300};
`;

export default class Blackcrows extends React.Component {
  static defaultProps = {
    loaderLineConfig: {},
  };

  componentWillMount() {
    if(this.props.startAnimation) {
      this.startAnimation(this.props);
    } else {
      this.setState({
        openRightWall: false,
        initialLinesPosition: [],
        lineAnimations: [],
      });
    }
    this.loadCoverImage(this.props.blackcrowsJob, this.props.onReady);
    // this.startAll();
  }

  startAll = () => {
    this.setState({
      startSubtitleAnimation: true,
      startRolesAnimation: true,
      showRoles: true,
      startToolsAnimation: true,
      showTools: true,
      startStoryTitleAnimation: true,
      startStoryAnimation: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.startAnimation && nextProps.startAnimation !== this.props.startAnimation) {
      this.startAnimation(nextProps);
    }
  }

  loadCoverImage = (blackcrowsJob, onReady) => {
    const image = new Image();
    image.src = blackcrowsJob.cover;
    image.onload = onReady;
  }

  startAnimation = (props) => {
    this.setState({
      openRightWall: false,
      initialLinesPosition: this.getInitialLinesPosition(props.loaderLineConfig),
      lineAnimations: this.getStartAnimations(),
    });
  }

  runBoxAnimation = () => this.setState({ runBoxAnimation: true })

  getInitialLinesPosition = () => ([
    { distance: getWindowWidth(), y: getWindowHeight() / 2 },
    { angle: 90, distance: 0, x: getWindowWidth() / 2 },
    { angle: 90, distance: 0, x: getWindowWidth() / 2 },
  ]);

  getStartAnimations = () => ([
    [
      { x: getWindowWidth() / 2, distance: 0 },
    ],
    [
      { y: getWindowHeight() / 2, restOn: ({ y }) => y > getWindowHeight() / 2 - 10 },
      { y: 0, opacity: 1, distance: getWindowHeight() },
    ],
    [
      { y: getWindowHeight() / 2, restOn: ({ y }) => y > getWindowHeight() / 2 - 10 },
      {
        y: 0,
        opacity: 1,
        distance: getWindowHeight(),
        restOn: ({ distance }) => distance > getWindowHeight() - 10,
        onFinish: () => this.setState({ openRightWall: true }),
      },
      { x: getWindowWidth() },
    ],
  ]);

  renderLineAnimations({ initialLinesPosition, lineAnimations }) {
    return lineAnimations.map((lineAnimation, index) => (
      <Line
        key={index}
        waitFor={100}
        initial={initialLinesPosition[index]}
        animations={lineAnimations[index]}
      />
    ));
  }

  render() {
    const {
      loaderLineConfig,
      primaryColor,
      blackcrowsJob,
    } = this.props;

    const {
      initialLinesPosition,
      lineAnimations,
      openRightWall,
      startSubtitleAnimation,
      startRolesAnimation,
      startRolesSelectorAnimation,
      showRoles,
      startToolsAnimation,
      startToolsSelectorAnimation,
      showTools,
      startStoryAnimation,
      startStoryTitleAnimation,
    } = this.state;

    const sublimeWaitFor = 1000;

    return (
      <Wrapper primaryColor={primaryColor}>
        <InnerWrapper>
          <JobDetails>
            <JobTitle>
              <Writer
                onRest={() => this.setState({ startSubtitleAnimation: true })}
                text={blackcrowsJob.title}
                start
                cpm={1000}
              />
            </JobTitle>
            <JobSubtitle>
              <Writer
                onRest={() => this.setState({ startRolesAnimation: true })}
                text={blackcrowsJob.subtitle}
                start={startSubtitleAnimation}
                cpm={1300}
              />
            </JobSubtitle>
            <JobSectionTitle>
              <Writer
                onRest={() => this.setState({ startToolsSelectorAnimation: true })}
                text={'Tools'}
                start={startToolsAnimation}
                cpm={1300}
              />
            </JobSectionTitle>
            <SublimeHelper
              start={startToolsSelectorAnimation}
              onSelect={() => this.setState({ startToolsSelectorAnimation: false, showTools: true, startStoryTitleAnimation: true })}
              itemIndex={5}
              item={{ left: 'Tools', right: 'Blackcrows' }}
              waitFor={sublimeWaitFor}
            />
            {
              showTools &&
              <JobToolsWrapper>
                {blackcrowsJob.tools.map(({ logo }, index) => (
                  <JobToolLogo key={index} src={logo} />
                ))}
              </JobToolsWrapper>
            }
            <JobSectionTitle>
              <Writer
                onRest={() => this.setState({ startRolesSelectorAnimation: true })}
                text={'Roles'}
                start={startRolesAnimation}
                cpm={1300}
              />
            </JobSectionTitle>
            <SublimeHelper
              start={startRolesSelectorAnimation}
              onSelect={() => this.setState({ startRolesSelectorAnimation: false, showRoles: true, startToolsAnimation: true })}
              itemIndex={3}
              item={{ left: 'Roles', right: 'Blackcrows' }}
              waitFor={sublimeWaitFor}
            />
            {
              showRoles &&
              <JobRoles>
                {blackcrowsJob.roles.map((role, index) => (
                  <JobRole key={index}>{role}</JobRole>
                ))}
              </JobRoles>
            }
            <JobSectionTitle>
              <Writer
                onRest={() => this.setState({ startStoryAnimation: true })}
                text={'Story'}
                start={startStoryTitleAnimation}
                cpm={1300}
              />
            </JobSectionTitle>
            <JobStory>
              <Writer
                text={blackcrowsJob.story}
                start={startStoryAnimation}
                cpm={1600}
              />
            </JobStory>
          </JobDetails>
          <CoverImage
            image={blackcrowsJob.cover}
          />
        </InnerWrapper>
        <BoxAnimation
          closeTop={false}
          closeBottom={false}
          closeLeft={false}
          closeRight={!openRightWall}
          primaryColor={primaryColor}
        />
        {this.renderLineAnimations({ initialLinesPosition, lineAnimations })}
      </Wrapper>
    );
  }
}
