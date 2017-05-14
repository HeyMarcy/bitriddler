import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'utils/styled-components';
import CubeImageRevealPlayground from 'components/Playground/CubeImageRevealPlayground';
import ExpandablePlayground from 'components/Playground/ExpandablePlayground';
import ItemsCarouselPlayground from 'components/Playground/ItemsCarouselPlayground';
import MotionGridPlayground from 'components/Playground/MotionGridPlayground';
import BottomSheetPlayground from 'components/Playground/BottomSheetPlayground';
import SwipeableTabsPlayground from 'components/Playground/SwipeableTabsPlayground';
import AppleCarouselPlayground from 'components/Playground/AppleCarouselPlayground';
import {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
} from 'containers/App/actions';
import Button from 'components/Utils/Button';
import Hero from 'components/Main/Hero';
import colors from 'theme/colors';
import selectors from './selectors';

const PRIMARY_COLOR = colors.white;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class Playground extends React.Component {

  componentDidMount() {
    this.props.setPagePrimaryColor(PRIMARY_COLOR);
    this.props.routeIsReady();
  }

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

  getOpensourceByGithub = (github) => {
    const {
      opensource,
    } = this.props;

    const found = opensource.find((one) => one.github === github);

    if(! found) {
      throw new Error("Opensource not found!");
    }

    return {
      title: found.title,
      subtitle: found.description,
      primaryColor: found.primaryColor,
      secondaryColor: colors.greySecondary,
      heroHidden: github === 'react-apple-carousel',
    };
  }

  getPackage = (name) => {
    switch(name) {
      case 'cube-image-reveal':
        return this.getOpensourceByGithub('react-cube-image-reveal');
      case 'expandable':
        return this.getOpensourceByGithub('react-expandable');
      case 'apple-carousel':
        return this.getOpensourceByGithub('react-apple-carousel');
      case 'bottom-sheet':
        return this.getOpensourceByGithub('react-bottom-sheet');
      case 'items-carousel':
        return this.getOpensourceByGithub('react-items-carousel');
      case 'motion-grid':
        return this.getOpensourceByGithub('react-motion-grid');
      case 'swipeable-tabs':
        return this.getOpensourceByGithub('react-swipeable-tabs');
    }
  }

  gotoOpensource = () => this.props.requestToLeaveRoute(`/opensource`);

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
            buttonText={'More open source'}
            onButtonClick={this.gotoOpensource}
            bgColor={pckg.primaryColor}
          />
        }
        {this.renderTab(packageName, pckg)}
        {
          pckg.heroHidden &&
          <ButtonWrapper>
            <Button secondary onClick={this.gotoOpensource}>
              More open source
            </Button>
          </ButtonWrapper>
        }
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
  push,
};

export default connect(selectors(), mapDispatchToProps)(Playground);
