import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import SkillChart from 'components/Home/SkillChart';
import SkillsBoxes from './SkillsBoxes';
import EntranceAnimation from './EntranceAnimation';
import selectors from './selectors';
import messages from './messages';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #900;
  position: relative;
`;

export class SkillsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.setState({
      startBoxesAnimation: false,
    });
  }

  render() {
    const {
      skills,
    } = this.props;

    const {
      startBoxesAnimation,
    } = this.state;

    return (
      <Wrapper>
        <SkillsBoxes
          startAnimation={startBoxesAnimation}
          skills={skills}
        />
        <EntranceAnimation
          onEntranceAnimationFinish={() => {
            this.setState({
              startBoxesAnimation: true,
            });
          }}
          startAnimation={true}
        />
      </Wrapper>
    );
  }
}

export default connect(selectors(), null)(SkillsPage);
