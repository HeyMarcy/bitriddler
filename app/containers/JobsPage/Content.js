import React from 'react';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import EntranceAnimation from './EntranceAnimation';
import SectionPagination from 'components/Main/SectionPagination';
import JobSection from 'components/Jobs/JobSection';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
`;

export class PageContent extends React.Component {

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
    } = this.props;

    return (
      <Wrapper>
        <EntranceAnimation
          startAnimation={startEntranceAnimation}
          primaryColor={firstPrimaryColor}
          loaderLineConfig={loaderLineConfig || {
            distance: getWindowWidth(),
            y: getWindowHeight() / 2,
          }}
          onFinish={onEntranceAnimationFinish}
        />
        {jobs.map((job, index) => (
          <JobSection
            key={index}
            job={job}
            isLeft={index%2 === 0}
            startAnimation={shouldStartJobAnimation(index)}
            primaryColor={job.primaryColor}
            onReady={() => {
              if(index === 0) {
                routeIsReady();
              }
            }}
          />
        ))}
        <SectionPagination
          length={jobs.length}
          activeIndex={activeJobIndex}
          onIndicatorClick={(index) => {
            this.context.scrollArea.scrollYTo(getWindowHeight() * index);
            updateActiveJobIndex(index);
          }}
        />
      </Wrapper>
    );
  }
}


PageContent.contextTypes = {
  scrollArea: React.PropTypes.object,
};

export default PageContent;
