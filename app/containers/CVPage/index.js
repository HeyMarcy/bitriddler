import React from 'react';
import { connect } from 'react-redux';
import styled from 'utils/styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DownloadIcon from 'react-icons/fa/download';
import colors from 'theme/colors';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
import {
  downloadPDF,
} from './actions';
import converter from 'utils/converter';
import selectors from './selectors';
import CV from './CV';
import A4 from './A4';

const PAGE_PRIMARY_COLOR = colors.white;

const OuterWrapper = styled.div`
`;

const StyledFloatingActionButton = styled(FloatingActionButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

class CVPage extends React.Component {
  componentWillMount() {
    this.props.routeIsReady();
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.setState({
      skillsHeight: 0,
    });
  }

  downloadPDF = () => {
    const renderedCV = this.renderCV(this.props, { skillsHeight: this.state.skillsHeight });
    const converted = converter(renderedCV);
    this.props.downloadPDF(converted);
  }

  renderCV({ about, contact, awards, references, hobbies, skills, otherSkills, workenvironment, educations, jobs }, { skillsHeight }) {
    return (
      <CV
        about={about}
        contact={contact}
        hobbies={hobbies}
        skills={skills}
        otherSkills={otherSkills}
        educations={educations}
        jobs={jobs}
        workenvironment={workenvironment}
        awards={awards}
        references={references}
        skillsHeight={skillsHeight}
        onSkillsHeightChange={(height) => this.setState({ skillsHeight: height })}
      />
    );
  }

  render() {
    return (
      <OuterWrapper>
        {/*<A4>*/}
          {this.renderCV(this.props, this.state)}
        {/*</A4>*/}
        {/*<StyledFloatingActionButton onClick={this.downloadPDF}>
          <DownloadIcon />
        </StyledFloatingActionButton>*/}
      </OuterWrapper>
    );
  }
}

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
  downloadPDF,
};

export default connect(selectors(), mapDispatchToProps)(CVPage);
