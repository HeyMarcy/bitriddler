import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import About from 'components/Home/About';
import StackGrid from 'components/Home/StackGrid';
import Timeline from 'components/Home/Timeline';
import SectionPagination from 'components/Main/SectionPagination';
import { getWindowHeight } from 'utils/screen';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import {
  blue900,
  black,
} from 'material-ui/styles/colors';
import SkillChart from 'components/Home/SkillChart';
import selector from './selectors';
import messages from './messages';

const Wrapper = styled.div`
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
`;

const PAGE_PRIMARY_COLOR = blue900;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({
      runLeaveAnimation: false,
    });
  }

  componentDidMount() {
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.props.routeIsReady();
  }

  leavePage = (route) => {
    this.setState({
      runLeaveAnimation: true,
      leaveRoute: route,
    });
  }

  gotoWorkExperience = () => this.leavePage('/work');
  gotoSkills = () => this.leavePage('/skills');
  gotoReactPlayground = () => this.leavePage('/playground');

  render() {
    const {
      runLeaveAnimation,
      leaveRoute,
    } = this.state;

    const {
      onAnimationFinish,
      routeIsReady,
    } = this.props;

    return (
      <Wrapper>
        <About
          primaryColor={PAGE_PRIMARY_COLOR}

          onLeaveAnimationFinish={({ lineConfig }) => onAnimationFinish(leaveRoute, lineConfig)}
          runLeaveAnimation={runLeaveAnimation}

          onWorkExperienceClick={this.gotoWorkExperience}
          onSkillsClick={this.gotoSkills}
          onReactPlaygroundClick={this.gotoReactPlayground}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = selector();

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  onAnimationFinish: requestToLeaveRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
