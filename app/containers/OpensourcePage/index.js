import React from 'react';
import { connect } from 'react-redux';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import { spring, StaggeredMotion } from 'react-motion';
import styled from 'styled-components';
import colors from 'theme/colors';
import GithubIcon from 'react-icons/fa/github';
import DemoIcon from 'react-icons/fa/external-link';
import { darken } from 'material-ui/utils/colorManipulator';
import preloadImage from 'components/Utils/Image/preloadImage';
import coverImage2560 from 'assets/opensource/cover2560x1709.jpg';
import coverImage1920 from 'assets/opensource/cover1920x1282.jpg';
import coverImage768 from 'assets/opensource/cover768x513.jpg';
import { opensourcePageFeatures } from 'utils/features';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import EntranceAnimation from './EntranceAnimation';
import selectors from './selectors';

const PAGE_PRIMARY_COLOR = colors.white;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${colors.whiteInverse};
  overflow: hidden;
`;

const Hero = styled.div`
  width: 100%;
  background: url('${(props) => props.image}');
  background-size: cover;
  background-position: center center;
  height: 50vh;
`;

const OpensourcesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const OpensourceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
  border-bottom: 1px solid #DDD;
  transform: translateY(${(props) => props.translateY}px);
  opacity: ${(props) => props.opacity};
`;

const OpensourceTitle = styled.h2`
`;

const OpensourceDescription = styled.h5`
  color: ${darken(colors.white, 0.6)};
  font-weight: 200;
`;

const OpensourceTagsWrapper = styled.div`
  display: flex;
`;

const OpensourceTagWrapper = styled.h6`
  cursor: pointer;
  padding: 3px 8px;
  background: ${colors.whiteInverse};
  color: ${colors.white};
  margin-right: 10px;
`;

const OpensourceCategory = styled.div`
`;

const OpensourceTools = styled.div`
`;

const OpenSourceTool = styled.div`
`;

const OpensourceActions = styled.div`
  margin-top: 10px;
  display: flex;
`;

const OpensourceAction = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const OpensourceActionText = styled.h6`
  margin: 0;
  margin-left: 5px;
`;

export class OpensourcePage extends React.Component {
  componentWillMount() {
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.setState({
      startOpensourceAnimation: false,
    });
  }

  componentDidMount() {
    this.loadImage();
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.imageLoaded && !this.state.imageLoaded) {
      this.props.routeIsReady();
    }
  }

  getCoverImage = () => {
    const screenWidth = getWindowWidth();
    const screenHeight = getWindowHeight();
    const hThreshold = 40;
    const vThreshold = 40;

    if(screenWidth > (1920 + hThreshold) || screenHeight > (1282 + vThreshold)) {
      return coverImage2560;
    }

    if(screenWidth > (768 + hThreshold) || screenHeight > (513 + vThreshold)) {
      return coverImage1920;
    }

    return coverImage768;
  }

  loadImage() {
    if(!this.state.imageLoaded && !this.state.imageLoading) {
      const src = this.getCoverImage();
      this.setState({ imageLoading: src });
      preloadImage(src, () => {
        this.setState({ imageLoaded: src });
      });
    }
  }


  getDefaultStyles = (opensource) => opensource.map(() => ({
    translateY: 500,
    opacity: 0,
  }));

  getStyles = (startAnimation) => (prevStyles) => prevStyles.map((_, index) => {
    if(! startAnimation) {
      return {
        translateY: spring(200),
        opacity: spring(0),
      };
    }

    return {
      translateY: spring(index === 0 ? 0 : prevStyles[index - 1].translateY),
      opacity: spring(index === 0 ? 1 : prevStyles[index - 1].opacity),
    };
  });

  startOpensourceAnimation = () => this.setState({ startOpensourceAnimation: true });

  gotoGithub = (opensource) => window.open(
    `http://github.com/bitriddler/${opensource.github}`,
    '_blank'
  );

  gotoDemo = (opensource) => window.open(
    `http://www.bitriddler.com/${opensource.demo}`,
    '_blank'
  );

  showEntranceAnimation = () =>
    opensourcePageFeatures.showEntranceAnimation();

  shouldStartOpensourceAnimation = () =>
    !this.showEntranceAnimation() || (this.state.startOpensourceAnimation && this.props.startAnimation);

  render() {
    const {
      opensource,
      startAnimation,
    } = this.props;

    const {
      startOpensourceAnimation,
    } = this.state;

    return (
      <Wrapper>
        <Hero
          image={this.getCoverImage()}
        />
        <StaggeredMotion
          defaultStyles={this.getDefaultStyles(opensource)}
          styles={this.getStyles(this.shouldStartOpensourceAnimation())}
        >
          {(styles) => (
            <OpensourcesWrapper>
              {opensource.map((opensource, i) => (
                <OpensourceWrapper
                  translateY={styles[i].translateY}
                  opacity={styles[i].opacity}
                  key={i}
                >
                  <OpensourceTitle>
                    {opensource.title}
                  </OpensourceTitle>
                  <OpensourceDescription>
                    {opensource.description}
                  </OpensourceDescription>
                  <OpensourceTagsWrapper>
                    {opensource.tags.map((tag, j) => (
                      <OpensourceTagWrapper key={j}>
                        {tag}
                      </OpensourceTagWrapper>
                    ))}
                  </OpensourceTagsWrapper>
                  <OpensourceActions>
                    <OpensourceAction onClick={() => this.gotoGithub(opensource)}>
                      <GithubIcon size={20} /> <OpensourceActionText>Github</OpensourceActionText>
                    </OpensourceAction>
                    <OpensourceAction onClick={() => this.gotoDemo(opensource)}>
                      <DemoIcon size={20} />  <OpensourceActionText>Demo</OpensourceActionText>
                    </OpensourceAction>
                  </OpensourceActions>
                </OpensourceWrapper>
              ))}
            </OpensourcesWrapper>
          )}
        </StaggeredMotion>
        {
          this.showEntranceAnimation() && !startOpensourceAnimation &&
          <EntranceAnimation
            startAnimation={startAnimation}
            wallColor={PAGE_PRIMARY_COLOR}
            lineColor={colors.whiteInverse}
            onFinish={this.startOpensourceAnimation}
          />
        }
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
};

export default connect(selectors(), mapDispatchToProps)(OpensourcePage);
