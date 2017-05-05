import React from 'react';
import EntranceAnimation from './EntranceAnimation';
import SectionPagination from 'components/Main/SectionPagination';
import {
  isSMScreen,
  isXSScreen,
  isMDScreen,
  isLGScreen,
  isXLScreen,
} from 'utils/screen';
import AppleCarousel from 'react-apple-carousel/src/AppleCarousel';
import JobSection, { getImageWidthPercentage } from 'components/Jobs/JobSection';
import { jobsPageFetaures } from 'utils/features';
import styled from 'styled-components';
import RightChevronIcon from 'react-icons/md/chevron-right';
import LeftChevronIcon from 'react-icons/md/chevron-left';
import colors from 'theme/colors';
import max from 'lodash/max';
import min from 'lodash/min';
import { media } from 'utils/styles';

const DesktopWrapper = styled.div`
`;

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftChevronWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 3em;
`;

const RightChevronWrapper = styled(LeftChevronWrapper)`
  left: initial;
  right: 0;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFF;
  color: ${(props) => colors.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  cursor: pointer;
`;

const JobWrapper = styled.div`
  background: ${(props) => props.bgColor};
  width: 100vw;
  height: 100vh;
  padding: 0 80px;

  /** On tablet and mobile **/
  ${media.md`
    padding: 24px;
    height: auto;
  `}
`;

export class PageContent extends React.Component {

  componentWillMount() {
    this.setState({
      activeSlideIndex: 0,
      entranceAnimationFinished: false,
    });
  }

  onEntranceAnimationFinish = () => this.setState({ entranceAnimationFinished: true });

  leftClickHandler = () => {
    const {
      activeSlideIndex,
    } = this.state;

    this.setState({
      activeSlideIndex: max([ activeSlideIndex - 1, 0 ]),
    });
  }

  rightClickHandler = () => {
    const {
      activeSlideIndex,
    } = this.state;

    const {
      jobs,
    } = this.props;

    this.setState({
      activeSlideIndex: min([ activeSlideIndex + 1, jobs.length - 1 ]),
    });
  }

  renderJob({ isCarousel, noAnimation, startAnimation, index, job }) {
    const {
      entranceAnimationFinished,
    } = this.state;

    const {
      routeIsReady,
    } = this.props;

    return (
      <JobWrapper
        isCarousel={isCarousel}
        bgColor={job.primaryColor}
      >
        <JobSection
          key={index}
          job={job}
          isLeft={index % 2 === 0}
          noAnimation={noAnimation}
          startAnimation={startAnimation}
          primaryColor={job.primaryColor}
          onReady={() => {
            if(index === 0) {
              routeIsReady();
            }
          }}
        />
      </JobWrapper>
    );
  }

  renderDesktop() {
    const {
      firstPrimaryColor,
      startEntranceAnimation,
      jobs,
      routeIsReady,
      windowWidth,
      windowHeight,
    } = this.props;

    const {
      activeSlideIndex,
      entranceAnimationFinished,
    } = this.state;

    const getJobRenderer = (job, index) => ({ slide, activeItemIndex }) => this.renderJob({
      startAnimation: entranceAnimationFinished && activeItemIndex === index,
      job,
      index,
    });

    return (
      <DesktopWrapper>
        <AppleCarousel
          activeItemIndex={activeSlideIndex}
          onActiveItemChange={(activeSlideIndex) => this.setState({ activeSlideIndex })}
          renderSlides={jobs.map(getJobRenderer)}
          enableIndicators={false}
          enableTimer={false}
        />
        {
          activeSlideIndex > 0 &&
          <LeftChevronWrapper onClick={this.leftClickHandler}>
            <IconWrapper><LeftChevronIcon /></IconWrapper>
          </LeftChevronWrapper>
        }
        {
          activeSlideIndex < jobs.length - 1 &&
          <RightChevronWrapper onClick={this.rightClickHandler}>
            <IconWrapper><RightChevronIcon /></IconWrapper>
          </RightChevronWrapper>
        }
        {
          !entranceAnimationFinished &&
          <EntranceAnimation
            imageWidthPercentage={getImageWidthPercentage()}
            startAnimation={startEntranceAnimation}
            primaryColor={firstPrimaryColor}
            onFinish={this.onEntranceAnimationFinish}
          />
        }
      </DesktopWrapper>
    );
  }

  renderMobile() {
    const {
      jobs,
    } = this.props;

    return (
      <MobileWrapper>
        {jobs.map((job, index) => this.renderJob({
          job,
          index,
          noAnimation: true,
        }))}
      </MobileWrapper>
    );
  }

  render() {
    return isLGScreen() || isXLScreen() ? this.renderDesktop() : this.renderMobile();
  }
}

export default PageContent;
