import React from 'react';
import { presets } from 'react-motion';
import Measure from 'react-measure';
import styled from 'utils/styled-components';
import MotionGrid from 'react-motion-grid';
import range from 'lodash/range';
import flatten from 'lodash/flatten';
import Box from 'components/Utils/Box';
import Paper from 'components/Layout/Paper';
import { lightWhite } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  margin-bottom: 100px;
`;

const AppShellItem = styled(Box)`
  background: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadMoreButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LoadingMoreItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  background: #333;
  color: #FFF;
`;

const Description = styled.div`
  background: ${(props) => props.bgColor};
`;

const DemoWrapper = styled.div`
  max-width: 600px;
  margin: 12px auto;
`;


const Item = styled(Box)`
  background: ${(props) => props.bgColor};
  color: #FFF;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const ItemTitle = styled.h5`
`;

const ItemSubtitle = styled.h6`
  color: ${lightWhite};
`;

const titles = [
  'Totally',
  'Build with',
];

const subtitles = [
  'customizable',
  'React motion',
];


export class MotionGridPlayground extends React.Component {

  componentWillMount() {
    this.setState({
      items: [],
    });

    setTimeout(() => {
      this.setState({
        items: this.createItems(9),
      });
    }, 500);
  }

  createItems(no, startWith = 1) {
    return range(no).map((i) => (
      <Item bgColor={this.props.primaryColor}>
        <ItemTitle>{titles[i] || (i + 1)}</ItemTitle>
        <ItemSubtitle>{subtitles[i]}</ItemSubtitle>
      </Item>
    ));
  }

  loadMoreItems = (items) => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        items: [
          ...items,
          ...this.createItems(9, items.length),
        ],
        isLoading: false,
      });
    }, 4000);
  }

  render() {
    const {
      items,
      isLoading,
    } = this.state;

    const {
      secondaryColor,
    } = this.props;

    return (
      <Wrapper>
        <Description bgColor={secondaryColor}>
          <Paper>
            <p>Grid customized to render 3 rows of data (9 items)</p>
            <ul>
              <li>
                <b>First row has</b> 3 items.
              </li>
              <li>
                <b>Second row has</b> 4 items.
              </li>
              <li>
                <b>Third row has</b> 2 items.
              </li>
            </ul>
            <p>It shows placeholders for the first time until data comes.</p>
            <p>Click on load more then keep scrolling to see data comes in 9 per request until all data fetches.</p>
          </Paper>
        </Description>
        <DemoWrapper>
          <MotionGrid
            columns={flatten(range(5).map(i => ([
              4, 4, 4,
              3, 3, 3, 3,
              6, 6,
            ])))}
            innerPadding={{
              vertical: 12,
              horizontal: 12,
            }}
            enableAppShell
            enablePaging
            appShellItem={<AppShellItem>Placeholder</AppShellItem>}
            pagingOptions={{
              isFetchedAll: items.length >= 30,
              isLoading: isLoading,
              loadMoreItems: () => this.loadMoreItems(items),
              renderLoadMoreButton: ({ onClick, disabled }) => (
                <LoadMoreButtonContainer>
                  <Button onClick={onClick} disabled={disabled}>Click to Load more</Button>
                </LoadMoreButtonContainer>
              ),
              renderLoadingMoreItems: () => (
                <LoadingMoreItems>Loading more items...</LoadingMoreItems>
              ),
            }}
            minimumAppShellTime={2000}
          >
            {items}
          </MotionGrid>
        </DemoWrapper>
      </Wrapper>
    );
  }
}

MotionGridPlayground.propTypes = {

};

MotionGridPlayground.defaultProps = {

};

export default MotionGridPlayground;
