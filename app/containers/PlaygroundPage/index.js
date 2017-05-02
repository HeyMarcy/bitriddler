import React from 'react';
import styled from 'styled-components';
import CubeImageRevealPlayground from 'components/Playground/CubeImageRevealPlayground';
import ExpandablePlayground from 'components/Playground/ExpandablePlayground';
import ItemsCarouselPlayground from 'components/Playground/ItemsCarouselPlayground';
import MotionGridPlayground from 'components/Playground/MotionGridPlayground';
import BottomSheetPlayground from 'components/Playground/BottomSheetPlayground';
import SwipeableTabsPlayground from 'components/Playground/SwipeableTabsPlayground';
import AppleCarouselPlayground from 'components/Playground/AppleCarouselPlayground';
import Hero from 'components/Main/Hero';
import colors from 'theme/colors';

const PRIMARY_COLOR = '#27607D';
const SECONDARY_COLOR = '#EEE';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export class Playground extends React.Component {

  renderTab = (name, pckg) => {
    switch(name) {
      case 'cube-image-reveal':
        return (
          <CubeImageRevealPlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
      case 'expandable':
        return (
          <ExpandablePlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
      case 'apple-carousel':
        return (
          <AppleCarouselPlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
      case 'bottom-sheet':
        return (
          <BottomSheetPlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
      case 'items-carousel':
        return (
          <ItemsCarouselPlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
      case 'motion-grid':
        return (
          <MotionGridPlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
      case 'swipeable-tabs':
        return (
          <SwipeableTabsPlayground
            primaryColor={pckg.primaryColor}
            secondaryColor={pckg.secondaryColor}
          />
        );
    }
  }

  getPackage = (name) => {
    switch(name) {
      case 'cube-image-reveal':
        return {
          title: 'Cube Image Reveal',
          subtitle: 'Another creative way to animate images into view',
          primaryColor: colors.blue,
          secondaryColor: colors.greySecondary,
        };
      case 'expandable':
        return {
          title: 'Expandable views',
          subtitle: '',
          primaryColor: colors.purple,
          secondaryColor: colors.greySecondary,
        };
      case 'apple-carousel':
        return {
          heroHidden: true,
          primaryColor: colors.red,
          secondaryColor: colors.greySecondary,
        };
      case 'bottom-sheet':
        return {
          title: 'Bottom Sheet',
          subtitle: 'Bottom sheet for mobile',
          primaryColor: colors.grey,
          secondaryColor: colors.greySecondary,
        };
      case 'items-carousel':
        return {
          title: 'Items Carousel',
          subtitle: 'A simple carousel, build on ReactMotion.',
          primaryColor: colors.orange,
          secondaryColor: colors.greySecondary,
        };
      case 'motion-grid':
        return {
          title: 'Motion Grid',
          subtitle: 'A simple grid with pagination strategy like instagram.',
          primaryColor: colors.green,
          secondaryColor: colors.greySecondary,
        };
      case 'swipeable-tabs':
        return {
          title: 'Swipeable tabs',
          subtitle: 'Tabs that swipe!',
          primaryColor: colors.brown,
          secondaryColor: colors.greySecondary,
        };
    }
  }

  render() {
    const {
      params,
    } = this.props;

    const { packageName } = params;
    const pckg = this.getPackage(packageName);

    return (
      <Wrapper>
        {
          !pckg.heroHidden &&
          <Hero
            title={pckg.title}
            subtitle={pckg.subtitle}
            bgColor={pckg.primaryColor}
          />
        }
        {this.renderTab(packageName, pckg)}
      </Wrapper>
    );
  }
}

Playground.propTypes = {

};

Playground.defaultProps = {

};

export default Playground;
