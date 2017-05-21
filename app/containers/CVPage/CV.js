import React from 'react';
import Measure from 'react-measure';
import styled from 'utils/styled-components';
import colors from 'theme/colors';
import { media } from 'utils/styles';
import { white, black, grey200, grey700 } from 'material-ui/styles/colors';
import {
  isXSScreen,
  isSMScreen,
} from 'utils/screen';
import { fade } from 'material-ui/utils/colorManipulator';
import EducationsPaper from './EducationsPaper';
import JobsPaper from './JobsPaper';
import SkillsPaper from './SkillsPaper';
import ContactMePaper from './ContactMePaper'
import HobbiesPaper from './HobbiesPaper';
import AboutMePaper from './AboutMePaper';
import AwardsPaper from './AwardsPaper';
import ReferencesPaper from './ReferencesPaper';
import Fonts from './Base/Fonts';
import spacing from './Base/spacing';

const VERTICAL_PADDING = spacing.verticalPadding;
const HORIZONTAL_PADDING = spacing.horizontalPadding;

const OuterWrapper = styled.div`
  max-width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  font-size: 14px;
`;

const Wrapper = styled.div`
  padding: ${VERTICAL_PADDING / 2}px 20px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.color};
  ${media.sm`
    flex-direction: column;
  `}
`;

const firstColumnWidth = spacing.firstColumnWidth;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${firstColumnWidth}%;
  ${media.sm`
    width: 100%;
  `}
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${100 - firstColumnWidth - 2}%;
  ${media.sm`
    width: 100%;
  `}
`;

const Paper = styled.div`
  background: ${(props) => props.bgColor ? props.bgColor : white};
  ${(props) => props.color && `color: ${props.color};`}
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  margin-top: ${VERTICAL_PADDING / 2}px;
  margin-bottom: ${VERTICAL_PADDING / 2}px;
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px;
`;

const Title = styled(Fonts.H2)`
  margin: 0;
  color: ${(props) => props.color};
`;

const Content = styled.div`
  padding: ${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px;
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.height && `height: ${props.height}px;`}
`;

const fadedBlack = fade(colors.whiteInverse, 0.7);
const blue = colors.blue;

const CV = ({
  about,
  contact,
  hobbies,
  skills,
  workenvironment,
  otherSkills,
  educations,
  awards,
  references,
  jobs,
  skillsHeight,
  onSkillsHeightChange,
}) => (
  <OuterWrapper>
    <Wrapper color={black}>
      <FirstColumn>

        {/* About */}
        <Paper isFirst>
          <Content height={isXSScreen() || isSMScreen() ? null : skillsHeight}>
            <AboutMePaper
              about={about}
              jobTitleFontColor={grey700}
            />
          </Content>
        </Paper>

        {/* Contact me */}
        <Paper bgColor={blue}>
          <Header>
            <Title color={white}>
              Contact me
            </Title>
          </Header>
          <Content>
            <ContactMePaper
              iconFontColor={blue}
              fontColor={white}
              iconBgColor={white}
              contact={contact}
            />
          </Content>
        </Paper>

        {/* Education paper */}
        <Paper>
          <Header>
            <Title color={blue}>
              Education
            </Title>
          </Header>
          <Content>
            <EducationsPaper
              locationFontColor={fadedBlack}
              dateFontColor={blue}
              educations={educations}
            />
          </Content>
        </Paper>

        {/* Work environment */}
        <Paper>
          <Header>
            <Title color={blue}>
              Development Tools
            </Title>
          </Header>
          <Content>
            <SkillsPaper
              inactiveColor={grey200}
              activeColor={blue}
              skills={workenvironment}
            />
          </Content>
        </Paper>

        {/* Awards */}
        <Paper>
          <Header>
            <Title color={blue}>
              Awards
            </Title>
          </Header>
          <Content>
            <AwardsPaper
              summaryColor={grey700}
              awards={awards}
            />
          </Content>
        </Paper>

        {/* References */}
        <Paper isLast>
          <Header>
            <Title color={blue}>
              References
            </Title>
          </Header>
          <Content>
            <ReferencesPaper
              summaryColor={grey700}
              references={references}
            />
          </Content>
        </Paper>



        {/* Hobbies paper */}
        {/*<Paper isLast>
          <Content>
            <HobbiesPaper
              hobbies={hobbies}
            />
          </Content>
        </Paper>*/}

      </FirstColumn>
      <SecondColumn>
        {/* Skills paper */}
        <Measure
          whitelist={['width', 'height']}
          includeMargin={false}
          onMeasure={({ height }) => onSkillsHeightChange(height)}
        >
          <Paper isFirst>
            <Header>
              <Title color={blue}>
                Professional Skills
              </Title>
            </Header>
            <Content>
              <SkillsPaper
                numberOfColumns={2}
                inactiveColor={grey200}
                activeColor={blue}
                skills={skills}
              />
            </Content>
          </Paper>
        </Measure>


        {/* Working experience paper */}
        <Paper>
          <Header>
            <Title color={blue}>
              Working Experience
            </Title>
          </Header>
          <Content>
            <JobsPaper
              rolesFontColor={grey700}
              dateFontColor={blue}
              toolBgColor={blue}
              toolFontColor={white}
              jobs={jobs}
            />
          </Content>
        </Paper>

      </SecondColumn>
    </Wrapper>
  </OuterWrapper>
);

CV.propTypes = {
  about: React.PropTypes.array,
  contact: React.PropTypes.array,
  hobbies: React.PropTypes.array,
  skills: React.PropTypes.array,
  otherSkills: React.PropTypes.array,
  educations: React.PropTypes.array,
  jobs: React.PropTypes.array,
  skillsHeight: React.PropTypes.number,
  onSkillsHeightChange: React.PropTypes.func,
}

export default CV;
