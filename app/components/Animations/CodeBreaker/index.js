import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-light.css';

const StyledHighlight = styled(Highlight)`
`;

export default class CodeBreaker extends React.Component {

  static propTypes = {
    waitFor: React.PropTypes.number,
    speed: React.PropTypes.number,
    code: React.PropTypes.string,
    noAnimation: React.PropTypes.bool,
  };

  static defaultProps = {
    waitFor: 1000,
    speed: 0.8,
    noAnimation: false,
  };

  componentWillMount() {
    this.setState({
      codeIndex: this.props.noAnimation ? this.props.code.length : 0,
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
      <StyledHighlight className={"dust"}>
        {code.slice(0, codeIndex) + (codeIndex >= code.length -1 ? '' : `_`)}
      </StyledHighlight>
    );
  }
}
