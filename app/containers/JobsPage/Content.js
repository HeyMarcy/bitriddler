import React from 'react';
import EntranceAnimation from './EntranceAnimation';
import SectionPagination from 'components/Main/SectionPagination';
import { isSMScreen, isXSScreen, isMDScreen } from 'utils/screen';
import JobSection, { getImageWidthPercentage } from 'components/Jobs/JobSection';
import { jobsPageFetaures } from 'utils/features';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
`;

export class PageContent extends React.Component {

  componentDidMount() {
    if(!jobsPageFetaures.showEntranceAnimation()) {
      this.props.onEntranceAnimationFinish();
    }
  }

  render() {
    const {
      loaderLineConfig,
      firstPrimaryColor,
      startEntranceAnimation,
      onEntranceAnimationFinish,
      shouldStartJobAnimation,
      jobs,
      routeIsReady,
      activeJobIndex,
      updateActiveJobIndex,
      windowWidth,
      windowHeight,
    } = this.props;

    return (
      <Wrapper>
        {
          jobsPageFetaures.showEntranceAnimation() &&
          <EntranceAnimation
            imageWidthPercentage={getImageWidthPercentage()}
            startAnimation={startEntranceAnimation}
            primaryColor={firstPrimaryColor}
            loaderLineConfig={loaderLineConfig || {
              distance: windowWidth,
              y: windowHeight / 2,
            }}
            onFinish={onEntranceAnimationFinish}
          />
        }
        {jobs.map((job, index) => (
          <JobSection
            key={index}
            job={job}
            isLeft={index%2 === 0}
            noAnimation={!jobsPageFetaures.animateSections()}
            startAnimation={shouldStartJobAnimation(index)}
            primaryColor={job.primaryColor}
            onReady={() => {
              if(index === 0) {
                routeIsReady();
              }
            }}
          />
        ))}
        {/*
          jobsPageFetaures.showSectionPagination() &&
          <SectionPagination
            length={jobs.length}
            activeIndex={activeJobIndex}
            onIndicatorClick={(index) => {
              this.context.scrollArea.scrollYTo(windowHeight * index);
              updateActiveJobIndex(index);
            }}
          />
        */}
      </Wrapper>
    );
  }
}

export default PageContent;
