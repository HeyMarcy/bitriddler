import React from 'react';
import Popover from 'material-ui/Popover';
import styled from 'styled-components';
import { grey200, grey500, grey800, blue700 } from 'material-ui/styles/colors';
import Writer from 'components/Animations/Writer';
import randomItems from './random';

const themePrimaryColor = blue700;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background: ${grey800};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  padding: 2px 10px;
  color: ${(props) => props.active ? grey200 : grey500};
`;

const MenuItemLeft = styled.div`
  b {
    color: ${themePrimaryColor};
  }
`;

const MenuItemRight = styled.div`
  font-style: italic;
`;

const ANIMATION_BREAK = 300;
const MAX_ITEMS = 6;

export default class SublimeHelper extends React.Component {

  static propTypes = {
    start: React.PropTypes.bool,
    onSelect: React.PropTypes.func.isRequired,
    itemIndex: React.PropTypes.number,
    item: React.PropTypes.shape({
      left: React.PropTypes.string,
      right: React.PropTypes.string,
    }),
    waitFor: React.PropTypes.number,
  };

  static defaultProps = {
    waitFor: ANIMATION_BREAK,
  };

  componentWillMount() {
    this.setState({
      wrapperEle: null,
      activeFocusIndex: 0,
    });

    if(this.props.start) {
      setTimeout(this.runAnimation, this.props.waitFor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.start && !this.props.start) {
      setTimeout(this.runAnimation, nextProps.waitFor);
    }
  }

  runAnimation = () => {
    const {
      activeFocusIndex,
    } = this.state;

    const {
      itemIndex,
    } = this.props;

    if(activeFocusIndex >= itemIndex) {
      this.props.onSelect();
      this.setState({
        animationFinished: true,
      });
    } else {
      this.setState({
        activeFocusIndex: activeFocusIndex + 1,
      });
      setTimeout(this.runAnimation, ANIMATION_BREAK);
    }
  }

  getFirstCharacters = () => {
    return this.props.item.left.slice(0, 2);
  }

  renderItem = ({ left, right }, index) => (
    <MenuItem key={index} active={this.state.activeFocusIndex === index}>
      <MenuItemLeft
        dangerouslySetInnerHTML={{
          __html: left.slice(0, 20).replace(this.getFirstCharacters(), `<b>${this.getFirstCharacters()}</b>`)
        }}
      />
      <MenuItemRight>{right}</MenuItemRight>
    </MenuItem>
  );

  render() {
    const {
      wrapperEle,
      activeFocusIndex,
      cursorAnimationFinished,
      animationFinished,
    } = this.state;

    const {
      item,
      start,
      onSelect,
      itemIndex,
      ...props,
    } = this.props;

    const beforeItems = randomItems.slice(0, itemIndex);
    const afterItems = randomItems.slice(itemIndex, MAX_ITEMS - 1);

    return (
      <div
        ref={(ele) => {
          if(ele && !wrapperEle) {
            this.setState({ wrapperEle: ele });
          }
        }}
        {...props}
      >
        {
          !animationFinished &&
          <Writer
            start={start}
            text={this.getFirstCharacters()}
            cpm={800}
            onRest={() => this.setState({ cursorAnimationFinished: true })}
            keepCursor
          />
        }
        {
          wrapperEle
          &&
          start
          &&
          cursorAnimationFinished
          &&
          <Popover
            animated={false}
            open={!!wrapperEle}
            anchorEl={wrapperEle}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuWrapper>
              {beforeItems.map(this.renderItem)}
              {this.renderItem(item, itemIndex)}
              {afterItems.map((item, index) => this.renderItem(item, index + 1 + itemIndex))}
            </MenuWrapper>
          </Popover>
        }
      </div>
    );
  }
}
