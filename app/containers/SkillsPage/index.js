import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import SkillChart from 'components/Home/SkillChart';
import Cloud from './Cloud';
import selectors from './selectors';
import messages from './messages';

const Wrapper = styled.div`
  display: flex;
  background: #fafafa;
`;

export class SkillsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      skills,
    } = this.props;

    return (
      <Cloud skills={skills} />
    );
  }
}

export default connect(selectors(), null)(SkillsPage);
