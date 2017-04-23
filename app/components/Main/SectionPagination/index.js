import React from 'react';
import styled from 'styled-components';
import { white } from 'material-ui/styles/colors';
import { darken } from 'material-ui/utils/colorManipulator';
import range from 'lodash/range';

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  right: 20px;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const IndicatorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Indicator = styled.div`
  width: 15px;
  height: 15px;
  margin-top: 10px;
  background: ${(props) => darken(white, !props.isActive ? 0.4 : 0)};
  border-radius: 50%;
  cursor: pointer;
`;

const SectionPagination = ({ length, onIndicatorClick, activeIndex, sectionHeight, ...props }, context) => (
  <Wrapper {...props}>
    <IndicatorsWrapper>
      {range(length).map((val, index) => (
        <Indicator
          key={index}
          onClick={() => context.scrollArea.scrollYTo(sectionHeight * index)}
          isActive={index === activeIndex}
        />
      ))}
    </IndicatorsWrapper>
  </Wrapper>
);

SectionPagination.propTypes = {
};

SectionPagination.contextTypes = {
  scrollArea: React.PropTypes.object,
};

export default SectionPagination;