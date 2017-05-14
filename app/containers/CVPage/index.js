import React from 'react';
import { connect } from 'react-redux';
import styled from 'utils/styled-components';
import colors from 'theme/colors';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import converter from 'utils/converter';
import selectors from './selectors';
import CV from './CV';

const PAGE_PRIMARY_COLOR = colors.white;

const A4_RATIO = (297 / 210);
const A4_WIDTH = 1115;

const OuterWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  /*width: ${A4_WIDTH}px;
  height: ${A4_RATIO * A4_WIDTH}px;*/
`;


class CVPage extends React.Component {
  componentWillMount() {
    this.props.routeIsReady();
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.setState({
      skillsHeight: 0,
    });

    console.log(converter(this.renderCV(this.props, { skillsHeight: 600 })).css);
  }

  renderCV({ about, contact, hobbies, skills, otherSkills, educations, jobs }, { skillsHeight }) {
    return (
      <CV
        about={about}
        contact={contact}
        hobbies={hobbies}
        skills={skills}
        otherSkills={otherSkills}
        educations={educations}
        jobs={jobs}
        skillsHeight={skillsHeight}
        onSkillsHeightChange={(height) => this.setState({ skillsHeight: height })}
      />
    );
  }

  render() {
    return (
      <OuterWrapper>
        {this.renderCV(this.props, this.state)}
      </OuterWrapper>
    );
  }
}

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
};

export default connect(selectors(), mapDispatchToProps)(CVPage);
