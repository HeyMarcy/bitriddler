import React from 'react';
import AppleCarousel from 'react-apple-carousel';
import Paper from 'components/Layout/Paper';
import styled from 'styled-components';
import getRenderSlides from './slides';

const Wrapper = styled.div`
`;

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
`;

const InputWrapper = styled.div`
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
`;

const Description = styled.div`
  background: ${(props) => props.bgColor};
`;

export default class AppleCarouselPlayground extends React.Component {
  componentWillMount() {
    this.setState({
      parallaxValue: -15,
    });
  }

  render() {
    const {
      secondaryColor,
    } = this.props;

    const {
      parallaxValue,
    } = this.state;

    return (
      <Wrapper>
        <AppleCarousel
          renderSlides={getRenderSlides(parallaxValue)}
        />
        <Description bgColor={secondaryColor}>
          <Paper>
            <p>Hey! The parallax animation you see here is not included with this package.</p>
          </Paper>
        </Description>
      </Wrapper>
    );
  }
}
