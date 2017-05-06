import React from 'react';
import styled from 'styled-components';
import FacebookIcon from 'react-icons/fa/facebook';
import MailIcon from 'react-icons/fa/envelope';
import PhoneIcon from 'react-icons/fa/phone';
import LinkedinIcon from 'react-icons/fa/linkedin';
import coverImage768 from 'assets/home/cover768x513.jpg';

const Wrapper = styled.div`
  display: flex;
`;

const SocialWrapper = styled.a`
  margin-right: 20px;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const ContactIcons = ({ ...props }) => (
  <Wrapper {...props}>
    <SocialWrapper bgColor={'#3b5998'} color={'white'} href={'https://www.facebook.com/karim.m.aly.9'} target={'_blank'}>
      <FacebookIcon
        size={20}
      />
    </SocialWrapper>
    <SocialWrapper bgColor={'#0077B5'} color={'white'} href={'https://www.linkedin.com/in/kareem-mohamed-908aa3116/'} target={'_blank'}>
      <LinkedinIcon
        size={20}
      />
    </SocialWrapper>
    <SocialWrapper bgColor={'white'} color={'#333'} href={'mailto:bitriddler@gmail.com'}>
      <MailIcon
        size={20}
      />
    </SocialWrapper>
    <SocialWrapper bgColor={'#333'} color={'white'} href={'tel:+201066088961'}>
      <PhoneIcon
        size={20}
      />
    </SocialWrapper>
  </Wrapper>
);

ContactIcons.propTypes = {
};

export default ContactIcons;
