import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight';
import 'highlight.js/styles/tomorrow-night.css';

const StyledHighlight = styled(Highlight)`
  height: 100vh;
`;

export default class CodeBreaker extends React.Component {

  static propTypes = {
    waitFor: React.PropTypes.number,
    speed: React.PropTypes.number,
    code: React.PropTypes.string,
  };

  static defaultProps = {
    waitFor: 1000,
    speed: 0.8,
  };

  componentWillMount() {
    this.setState({
      codeIndex: 0,
    });

    setTimeout(this.animateText, this.props.waitFor);
  }

  animateText = () => {
    const {
      codeIndex,
    } = this.state;

    this.setState({
      codeIndex: codeIndex + 1,
    });

    setTimeout(this.animateText, Math.random() * (1 - this.props.speed) * 20 + 30);
  }

  render() {
    const {
      codeIndex,
    } = this.state;

    const {
      code,
    } = this.props;

    return (
      <StyledHighlight className={"javascript"}>
        {code.slice(0, codeIndex) + (codeIndex >= code.length -1 ? '' : `_`)}
      </StyledHighlight>
    );
  }
}
