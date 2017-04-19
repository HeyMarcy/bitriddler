import React from 'react';
import CubeImageReveal from 'react-cube-image-reveal/src/CubeImageReveal';
import styled from 'styled-components';

const items = [
  {
    image: 'https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png',
    title: 'React',
  },
  {
    image: 'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png',
    title: 'Redux/Redux-saga',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png',
    title: 'GraphQL/Relay',
  },
  {
    image: 'http://graphql.org/users/logos/github.png',
    title: 'Github',
  },
  {
    image: 'http://graphql.nodaljs.com/static/images/heart.png',
    title: ':)',
  },
];

const CHANGE_SLIDE_INTERVAL = 3000;
const ANIMATION_REST_APPROX = 1000;

const Wrapper = styled.div`
`;

const Title = styled.h5`
`;

export default class ProfileCircle extends React.Component {

  componentWillMount() {
    this.setState({
      reverse: false,
      slide: 0,
    });

    setTimeout(this.changeSlide, CHANGE_SLIDE_INTERVAL);
  }

  changeSlide = () => {
    this.setState({
      reverse: true,
    });

    setTimeout(() => {
      this.setState({
        reverse: false,
        slide: this.getNextSlideIndex(),
      });
      setTimeout(this.changeSlide, CHANGE_SLIDE_INTERVAL);
    }, ANIMATION_REST_APPROX);
  }

  getNextSlideIndex = () => {
    if(this.state.slide >= items.length - 1) {
      return 0;
    }
    return this.state.slide + 1;
  }

  render() {
    const {
      slide,
      reverse,
    } = this.state;

    return (
      <Wrapper>
        <CubeImageReveal
          image={items[slide].image}
          width={300}
          height={300}
          piecesPerWidth={8}
          inverseAnimation={reverse}
          springConfig={{
            stiffness: 188,
            damping: 29,
          }}
        />
        <Title>{items[slide].title}</Title>
      </Wrapper>
    );
  }
}

