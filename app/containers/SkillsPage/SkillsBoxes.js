import React from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import styled from 'styled-components';
import Box from 'components/Utils/Box';
import Image from 'components/Utils/Image';
import { darkWhite, lightWhite } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Skill = styled.div`
  flex: 0 0 25%;
  height: 25vh;
`;


const SkillContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F1F1F1;
  height: ${(props) => props.height * 25}vh;
`;


const SkillLogoWrapper = styled.div`
  height: 15vh;
  width: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFF;
  border-radius: 50%;
`;

const SkillLogo = styled(Image)`
  width: auto;
  height: 10vh;
`;

const SkillName = styled.h4`
`;

export class SkillsBoxes extends React.Component {

  getDefaultStyles = (skills) => skills.map(skill => ({
    height: 0,
  }));

  getStyles = (startAnimation) => (prevStyles) => prevStyles.map((prevStyle, index) => ({
    height: spring(startAnimation ? 1 : 0),
  }));

  render() {
    const {
      startAnimation,
    } = this.props;

    const skills = this.props.skills.slice(0, 16);

    return (
      <StaggeredMotion
        defaultStyles={this.getDefaultStyles(skills)}
        styles={this.getStyles(startAnimation)}
      >
      {(styles) => (
        <Wrapper>
          {skills.map((skill, index) => (
            <Skill key={index}>
              <SkillContent height={styles[index].height} bgColor={skill.tool.color}>
                <SkillLogoWrapper>
                  <SkillLogo
                    useImgTag
                    image={styles[index].height > 0.9 ? skill.tool.logo : ''}
                    noPreloader
                  />
                </SkillLogoWrapper>
              </SkillContent>
            </Skill>
          ))}
        </Wrapper>
      )}
      </StaggeredMotion>
    );
  }
}

SkillsBoxes.propTypes = {
  skills: React.PropTypes.arrayOf(React.PropTypes.shape({
    tool:React.PropTypes.shape({
      color: React.PropTypes.string,
      image: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
  })),
};

SkillsBoxes.defaultProps = {

};

export default SkillsBoxes;
