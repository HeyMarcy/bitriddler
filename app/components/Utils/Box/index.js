import React from 'react';
import Measure from 'react-measure';
import styled from 'utils/styled-components';

const StyledBox = styled.div`
  height: ${(props) => props.height}px;
  ${(props) => props.maxHeight && `max-height: ${props.maxHeight}px;`}
`;

export default class Box extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    heightRatio: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
  };

  static defaultProps = {
    heightRatio: 1,
  };

  render() {
    const {
      heightRatio,
      maxHeight,
      ...props,
    } = this.props;
    return (
      <Measure whitelist={['width']} includeMargin={false}>
        {(dimensions) => (
          <StyledBox
            height={dimensions.width * heightRatio}
            maxHeight={maxHeight}
            {...props}
          />
        )}
      </Measure>
    );
  }
}
