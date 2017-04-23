import React from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import {
  white,
  lightWhite,
  darkWhite,
  grey200,
} from 'material-ui/styles/colors';
import flatten from 'lodash/flatten';
import Job from 'components/Home/Job';
import MiniJob from 'components/Home/MiniJob';
import { getWindowWidth } from 'utils/screen';

const pointWidth = 15;
const connectorHeight = 1;
const timelineColor = lightWhite;
const timlineActiveColor = white;

const Wrapper = styled.div`
  background: ${(props) => props.primaryColor};
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoverWrapper = styled.div`
  background: url(${(props) => props.cover});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  transition: opacity 0.5s ease;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
`;

const TimelineWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-end;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.translateX}px);
`;

const getTimelinePointActiveStyle = (props) => `
  background: ${timlineActiveColor};
`;

const TimelinePointWrapper = styled.div`
  position: relative;
`;

const TimelinePoint = styled.div`
  background: ${timelineColor};
  border-radius: 50%;
  width: ${pointWidth}px;
  height: ${pointWidth}px;
  cursor: pointer;
  transition: background 0.5s ease;
  ${(props) => props.isActive && getTimelinePointActiveStyle(props)}
  &:hover {
    ${(props) => getTimelinePointActiveStyle(props)}
  }
`;

const TimelinePointDetails = styled.div`
  position: absolute;
  bottom: 15px;
  min-width: ${(props) => props.previousConnectorWidth}px;
`;

const TimelineConnector = styled.div`
  width: ${(props) => props.width}px;
  height: ${connectorHeight}px;
  background: ${timelineColor};
`;

const JobCover = styled.div`
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

const JobWrapper = styled.div`
  max-width: 600px;
  z-index: 1000;
`;

export default class Timeline extends React.Component {

  componentWillMount() {
    this.setState({
      activeJobIndex: 0,
      connectorWidths: this.props.jobs.map(this.getConnectorWidth),
    });
  }

  getConnectorWidth = (job) => {
    return Math.random() * 80 + 300;
  };

  changeActiveJob = (activeJobIndex) => this.setState({ activeJobIndex });

  calculateTranslateX = ({ jobs, activeJobIndex, timelineWidth, connectorWidths }) => {
    let totalConnectorWidth = 0;

    for (var i = 0; i < activeJobIndex; i++) {
      totalConnectorWidth += connectorWidths[i];
    }

    return -timelineWidth / 2 + totalConnectorWidth;
  }

  renderTimeline = ({ jobs, activeJobIndex, timelineWidth, connectorWidths }) => {
    return (
      <Measure
        onMeasure={({ width }) => this.setState({ timelineWidth: width })}
        whitelist={['width']}
      >
        <TimelineWrapper
          translateX={this.calculateTranslateX({
            jobs,
            activeJobIndex,
            timelineWidth,
            connectorWidths,
          })}
        >
          {flatten(jobs.map((job, index) => ([
            <TimelinePointWrapper key={`point${index}`}>
              <TimelinePointDetails
                onClick={() => this.changeActiveJob(index)}
                previousConnectorWidth={index > 1 ? connectorWidths[index - 1] : 0}
              >
                <MiniJob job={job} />
              </TimelinePointDetails>
              <TimelinePoint
                onClick={() => this.changeActiveJob(index)}
              />
            </TimelinePointWrapper>,
            <TimelineConnector
              key={`connector${index}`}
              width={index === jobs.length - 1 ? 2000 : connectorWidths[index]}
            />,
          ])))}
        </TimelineWrapper>
      </Measure>
    );
  }

  previousTab = (activeJobIndex) => {
    if(activeJobIndex > 0) {
      this.changeActiveJob(activeJobIndex - 1);
    }
  }


  nextTab = (activeJobIndex, jobs) => {
    if(activeJobIndex < jobs.length - 1) {
      this.changeActiveJob(activeJobIndex + 1);
    }
  }

  render() {
    const {
      activeJobIndex,
      timelineWidth,
      connectorWidths,
    } = this.state;

    const {
      jobs,
      primaryColor,
    } = this.props;

    const job = jobs[activeJobIndex];

    return (
      <Wrapper primaryColor={primaryColor}>
        <JobWrapper>
          <Job
            primaryColor={primaryColor}
            job={job}
            onLeftArrowClick={() => this.nextTab(activeJobIndex, jobs)}
            onRightArrowClick={() => this.previousTab(activeJobIndex)}
          />
        </JobWrapper>
        <CoverWrapper cover={job.cover} />
        {this.renderTimeline({ jobs, activeJobIndex, timelineWidth, connectorWidths })}
      </Wrapper>
    );
  }
}
