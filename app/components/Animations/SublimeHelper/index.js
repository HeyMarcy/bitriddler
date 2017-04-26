import React from 'react';
import Popover from 'material-ui/Popover';
import styled from 'styled-components';
import { grey200, grey500, grey800 } from 'material-ui/styles/colors';
import randomItems from './random';

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
    } else {
      this.setState({
        activeFocusIndex: activeFocusIndex + 1,
      });
      setTimeout(this.runAnimation, ANIMATION_BREAK);
    }
  }

  renderItem = ({ left, right }, index) => (
    <MenuItem key={index} active={this.state.activeFocusIndex === index}>
      <MenuItemLeft>{left}</MenuItemLeft>
      <MenuItemRight>{right}</MenuItemRight>
    </MenuItem>
  );

  render() {
    const {
      wrapperEle,
      activeFocusIndex,
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
          wrapperEle
          &&
          start
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
