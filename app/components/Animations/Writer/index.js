import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-light.css';

const StyledHighlight = styled(Highlight)`
`;

export default class CodeBreaker extends React.Component {

  static propTypes = {
    waitFor: React.PropTypes.number,
    cpm: React.PropTypes.number,
    text: React.PropTypes.string,
    onRest: React.PropTypes.func,
    start:React.PropTypes.bool,
  };

  static defaultProps = {
    waitFor: 1000,
    cpm: 1500,
    text: '',
  };

  componentWillMount() {
    this.setState({
      textIndex: 0,
      showCursor: false,
    });

    if(this.props.start) {
      setTimeout(this.animateText, this.props.waitFor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.start && !this.props.start) {
      this.animateText();
    }
  }

  animateText = () => {
    const {
      textIndex,
      showCursor,
    } = this.state;

    const {
      text,
      onRest,
      cpm,
    } = this.props;

    if(textIndex < text.length) {
      this.setState({
        textIndex: textIndex + 1,
        showCursor: true,
      });

      setTimeout(this.animateText, (60 / cpm) * 1000);
    } else {
      this.setState({
        showCursor: false,
      });
      onRest && onRest();
    }
  }

  render() {
    const {
      textIndex,
      showCursor,
    } = this.state;

    const {
      text,
      cpm,
      waitFor,
      onRest,
      ...props,
    } = this.props;

    return (
      <span {...props}>
        {text.slice(0, textIndex) + (showCursor ? '_' : '')}
      </span>
    );
  }
}
