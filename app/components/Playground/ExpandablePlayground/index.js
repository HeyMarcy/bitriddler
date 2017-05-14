import React from 'react';
import styled from 'utils/styled-components';
import Checkbox from 'material-ui/Checkbox';
import CodeBreaker from 'components/Animations/CodeBreaker';
import code from './code';
import Paper from 'components/Layout/Paper';
import Expandable from 'react-expandable';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-light.css';

const Wrapper = styled.div`
`;

const Item = styled.div`
  padding: 24px;
  background: #f9f9f9;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
  background: ${(props) => props.bgColor};
  color: #FFF;
`;

const ItemTitle = styled.div`
`;

const ItemIcon = styled.div`
`;

const Controllers = styled.div`
  display: flex;
  justify-content: center;
  background: ${(props) => props.bgColor};
`;

const Controller = styled.div`
  display: flex;
  width: 320px;
`;

const DemoWrapper = styled(Paper)`
`;

export class ExpandablePlayground extends React.Component {
  componentWillMount() {
    this.setState({
      enableMultiOpen: false,
    });
  }

  render() {
    const {
      enableMultiOpen,
    } = this.state;

    const {
      primaryColor,
      secondaryColor,
    } = this.props;

    return (
      <Wrapper>
        <Controllers bgColor={secondaryColor}>
          <Paper>
            <Controller>
              <Checkbox
                checked={enableMultiOpen}
                onCheck={(_, isChecked) => this.setState({ enableMultiOpen: isChecked })}
                label="Enable multiple opens"
              />
            </Controller>
          </Paper>
        </Controllers>
        <DemoWrapper>
          <Expandable
            headers={[
              ({ isOpened }) => (
                <ItemHeader bgColor={primaryColor}>
                  <ItemTitle>Tab1</ItemTitle>
                  <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
                </ItemHeader>
              ),
              ({ isOpened }) => (
                <ItemHeader bgColor={primaryColor}>
                  <ItemTitle>Tab2</ItemTitle>
                  <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
                </ItemHeader>
              ),
              ({ isOpened }) => (
                <ItemHeader bgColor={primaryColor}>
                  <ItemTitle>Tab3</ItemTitle>
                  <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
                </ItemHeader>
              ),
            ]}
            enableMultiOpen={enableMultiOpen}
          >
            <Item>
              <h2>Simply any react component</h2>
              <p>
                <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.
              </p>
              <ul>
                <li>
                  Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                </li>
                <li>
                  1914 translation by H. Rackham
                </li>
                <li>
                  The standard Lorem Ipsum passage, used since the 1500s
                </li>
                <li>
                  Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                </li>
              </ul>
            </Item>
            <Item>
              <h3>
                Totally customizable.
              </h3>
            </Item>
            <Item>
              <h3>
                Build with React Motion.
              </h3>
            </Item>
          </Expandable>
        </DemoWrapper>
      </Wrapper>
    );
  }
}

ExpandablePlayground.propTypes = {

};

ExpandablePlayground.defaultProps = {

};

export default ExpandablePlayground;
