import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import CloseIcon from 'react-icons/md/close';
import BurgerIcon from 'react-icons/md/menu';
import menuStyles from './menuStyles';
import styled from 'utils/styled-components';
import colors from 'theme/colors';

const Wrapper = styled.div`
`;

const MenuWrapper = styled.div`
  position: relative;
  z-index: 102;
  background: ${(props) => props.bgColor};
  height: 100vh;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 24px;
`;

const Link = styled.a`
  padding: 10px;
  text-decoration: none;
  display: block;
  color: ${colors.blackInverse};
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${colors.blackInverse};
  cursor: pointer;
`;

const BurgerMenuWrapper = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  color: ${colors.blackInverse};
  cursor: pointer;
`;

export default class HeaderMenu extends React.Component {
  componentWillMount() {
    this.setState({
      openMenu: false,
    });
  }

  onMenuClick = () => this.setState({ openMenu: true });
  onCloseClick= () => this.setState({ openMenu: false });

  render() {
    const {
      openMenu,
    } = this.state;

    const {
      bgColor,
    } = this.props;

    return (
      <Wrapper>
        <BurgerMenuWrapper onClick={this.onMenuClick}>
          <BurgerIcon width={20} height={20} />
        </BurgerMenuWrapper>
        <Menu
          isOpen={openMenu}
          customBurgerIcon={false}
          customCrossIcon={false}
          right
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          styles={menuStyles}
        >
          <MenuWrapper bgColor={bgColor}>
            <LinksWrapper>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="">Settings</Link>
            </LinksWrapper>
            <CloseIconWrapper onClick={this.onCloseClick}>
              <CloseIcon width={20} height={20} />
            </CloseIconWrapper>
          </MenuWrapper>
        </Menu>
      </Wrapper>
    );
  }
}
