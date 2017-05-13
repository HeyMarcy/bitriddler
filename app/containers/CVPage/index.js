import React from 'react';
import Measure from 'react-measure';
import { connect } from 'react-redux';
import styled from 'styled-components';
import colors from 'theme/colors';
import { media } from 'utils/styles';
import { white, black, grey200, grey600 } from 'material-ui/styles/colors';
import {
  requestToLeaveRoute,
  routeIsReady,
  setPagePrimaryColor,
} from 'containers/App/actions';
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
import selectors from './selectors';

const PAGE_PRIMARY_COLOR = colors.white;

const VERTICAL_PADDING = 24;
const HORIZONTAL_PADDING = 36;

const A4_RATIO = (297 / 210);
const A4_WIDTH = 1115;

const OuterWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  /*width: ${A4_WIDTH}px;
  height: ${A4_RATIO * A4_WIDTH}px;*/
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

const firstColumnWidth = 35;

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

const Title = styled.h2`
  color: ${(props) => props.color};
`;

const Content = styled.div`
  padding: ${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px;
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.height && `height: ${props.height}px;`}
`;

class CVPage extends React.Component {
  componentWillMount() {
    this.props.routeIsReady();
    this.props.setPagePrimaryColor(PAGE_PRIMARY_COLOR);
    this.setState({
      skillsHeight: 0,
    });
  }

  render() {
    const {
      about,
      contact,
      hobbies,
      skills,
      otherSkills,
      educations,
      jobs,
    } = this.props;

    const {
      skillsHeight,
    } = this.state;

    const fadedBlack = fade(colors.whiteInverse, 0.7);
    const blue = colors.blue;

    return (
      <OuterWrapper>
        <Wrapper color={black}>
          <FirstColumn>

            {/* About */}
            <Paper isFirst>
              <Content height={isXSScreen() || isSMScreen() ? null : skillsHeight}>
                <AboutMePaper
                  about={about}
                  jobTitleFontColor={grey600}
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
                  verticalPadding={VERTICAL_PADDING}
                  educations={educations}
                />
              </Content>
            </Paper>

            {/* other skills */}
            <Paper>
              <Header>
                <Title color={blue}>
                  Other skills
                </Title>
              </Header>
              <Content>
                <SkillsPaper
                  inactiveColor={grey200}
                  activeColor={blue}
                  skills={otherSkills}
                />
              </Content>
            </Paper>



            {/* Hobbies paper */}
            <Paper isLast>
              <Content>
                <HobbiesPaper
                  hobbies={hobbies}
                />
              </Content>
            </Paper>

          </FirstColumn>
          <SecondColumn>
            {/* Skills paper */}
            <Measure
              whitelist={['width', 'height']}
              includeMargin={false}
              onMeasure={({ height }) => this.setState({ skillsHeight: height })}
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
                  rolesFontColor={fadedBlack}
                  dateFontColor={blue}
                  toolBgColor={blue}
                  toolFontColor={white}
                  verticalPadding={VERTICAL_PADDING}
                  jobs={jobs.slice(0, 5)}
                />
              </Content>
            </Paper>

          </SecondColumn>
        </Wrapper>
      </OuterWrapper>
    );
  }
}

const mapDispatchToProps = {
  setPagePrimaryColor,
  routeIsReady,
  requestToLeaveRoute,
};

export default connect(selectors(), mapDispatchToProps)(CVPage);