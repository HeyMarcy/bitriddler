import React from 'react';
import Measure from 'react-measure';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWindowHeight, getWindowWidth } from 'utils/screen';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import colors from 'theme/colors';
import ContactIcons from 'components/Contact/ContactIcons';
import IntroEntranceAnimation from 'components/EntranceAnimations/IntroEntranceAnimation';
import Writer from 'components/Animations/Writer';
import { fade, darken } from 'material-ui/utils/colorManipulator';
import selector from './selectors';

const PAGE_PRIMARY_COLOR = colors.black;
const FONT_COLOR = colors.blackInverse;

const Wrapper = styled.div`
  background: ${PAGE_PRIMARY_COLOR};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: ${(props) => props.fontColor};
`;

const Subtitle = styled.h5`
  color: ${(props) => fade(props.fontColor, 0.5)};
  min-height: 20px;
`;

const ShareWrapper = styled.div`
  margin-top: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  background: ${fade(PAGE_PRIMARY_COLOR, 0.5)};
`;

export class ContactPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.routeIsReady();
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.setState({
      contentWidth: 0,
      contentHeight: 0,
    });
  }

  updateContentDimensions = ({ width, height }) => this.setState({ contentWidth: width, contentHeight: height });

  render() {
    const {
      requestToLeaveRoute,
      routeIsReady,
      startAnimation,
      contact,
    } = this.props;

    const {
      contentWidth,
      contentHeight,
    } = this.state;
    return (
      <Wrapper>
        <Measure whitelist={['width', 'height']} onMeasure={this.updateContentDimensions}>
          <Content>
            <Title fontColor={FONT_COLOR}>Contact Me</Title>
            <Subtitle fontColor={FONT_COLOR}>
              <Writer
                text={'A simple hello could lead to a million things ;)'}
                start
                cpm={1000}
                waitFor={1500}
              />
            </Subtitle>
            <ShareWrapper>
              <ContactIcons
                contact={contact}
              />
            </ShareWrapper>
          </Content>
        </Measure>
        {/*<IntroEntranceAnimation
          color={darken(PAGE_PRIMARY_COLOR, 0.1)}
          wallColor={PAGE_PRIMARY_COLOR}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
          contentPadding={0}
          startAnimation={contentWidth > 10 && startAnimation}
          runLeaveAnimation={false}
          onLeaveAnimationFinish={() => {}}

          fullAnimation={false}
        />*/}
      </Wrapper>
    );
  }
}

const mapStateToProps = selector();

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
