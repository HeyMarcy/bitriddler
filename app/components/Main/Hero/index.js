import React from 'react';
import styled from 'styled-components';
import { darkWhite } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 500px;
  height: 40vh;
  color: #FFF;
  background: ${(props) => props.bgColor};
`;

const HeroTitle = styled.h2`
  margin-bottom: 10px;
  color: ${darkWhite};
  text-align: center;
`;

const HeroSubtitle = styled.h5`
  color: ${darkWhite};
  text-align: center;
`;

const Hero = ({ title, subtitle, bgColor, ...props }) => (
  <Wrapper bgColor={bgColor} {...props}>
    <HeroTitle>{title}</HeroTitle>
    <HeroSubtitle>{subtitle}</HeroSubtitle>
  </Wrapper>
);

Hero.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
};

export default Hero;
