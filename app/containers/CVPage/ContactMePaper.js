import React from 'react';
import styled from 'utils/styled-components';
import MailIcon from 'react-icons/fa/envelope';
import PhoneIcon from 'react-icons/fa/phone';
import WebsiteIcon from 'react-icons/fa/location-arrow';
import LocationIcon from 'react-icons/fa/map-marker';
import spacing from './Base/spacing';
import Fonts from './Base/Fonts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
`;

const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  ${(props) => !props.isFirst && `margin-top: ${props.verticalPadding / 2}px;`}
  ${(props) => !props.isLast && `margin-bottom: ${props.verticalPadding / 2}px;`}
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.contact.iconPadding}px;
`;

const ContactText = styled(Fonts.P)`
  margin-left: ${spacing.contact.textPadding}px;
`;

const ICON_SIZE = spacing.contact.iconSize;
const VERTICAL_PADDING = spacing.contact.verticalPadding;

const ContactMePaper = ({ contact, fontColor, iconFontColor, iconBgColor }) => (
  <Wrapper color={fontColor}>
    <ContactWrapper verticalPadding={VERTICAL_PADDING} isFirst>
      <IconWrapper bgColor={iconBgColor} color={iconFontColor}><PhoneIcon size={ICON_SIZE} /></IconWrapper>
      <ContactText>{contact.phoneNumber}</ContactText>
    </ContactWrapper>
    <ContactWrapper verticalPadding={VERTICAL_PADDING}>
      <IconWrapper bgColor={iconBgColor} color={iconFontColor}><MailIcon size={ICON_SIZE} /></IconWrapper>
      <ContactText>{contact.mail}</ContactText>
    </ContactWrapper>
    {
      contact.website &&
      <ContactWrapper verticalPadding={VERTICAL_PADDING}>
        <IconWrapper bgColor={iconBgColor} color={iconFontColor}><WebsiteIcon size={ICON_SIZE} /></IconWrapper>
        <ContactText>{contact.website}</ContactText>
      </ContactWrapper>
    }
    {
      contact.location &&
      <ContactWrapper verticalPadding={VERTICAL_PADDING} isLast>
        <IconWrapper bgColor={iconBgColor} color={iconFontColor}><LocationIcon size={ICON_SIZE} /></IconWrapper>
        <ContactText>{contact.location}</ContactText>
      </ContactWrapper>
    }
  </Wrapper>
);

ContactMePaper.propTypes = {
};

export default ContactMePaper;
