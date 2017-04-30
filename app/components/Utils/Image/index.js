import React from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { white } from 'material-ui/styles/colors';
import Box from 'components/Utils/Box';
import preloadImage from './preloadImage';

const getCSSValue = (value) => !isNaN(value) ? `${value}px` : value;

const ImageTag = styled.img`
  ${(props) => props.circle && 'border-radius: 50%'};
  ${(props) => props.onClick && `cursor: pointer;`}
`;

const ImageDiv = styled.div`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  ${(props) => props.circle && 'border-radius: 50%'};
  ${(props) => props.cover && 'background-size: cover'};
  ${(props) => props.contained && 'background-size: contain'};
  ${(props) => props.onClick && `cursor: pointer;`}
  width: ${(props) => props.width ? getCSSValue(props.width) : '100%'};
  height: ${(props) => props.height ? getCSSValue(props.height) : '100%'};
`;

const ImagePreloader = styled.div`
  width: ${(props) => props.width ? getCSSValue(props.width) : '100%'};
  height: ${(props) => props.height ? getCSSValue(props.height) : '100%'};
  ${(props) => props.onClick && `cursor: pointer;`}
  ${(props) => !props.noPreloader && `background: ${white};`}
  ${(props) => !props.noPreloader && `border: 1px solid ${props.theme.borderBottomColor};`}
  ${(props) => props.circle && 'border-radius: 50%;'}
`;

export default class Image extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.loadImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.image !== this.props.image) {
      this.loadImage(nextProps);
    }
  }

  loadImage(props) {
    const {
      image,
      onLoad,
    } = props;

    // Preload image
    preloadImage(image, () => {
      // Image successfully loadded
      onLoad && onLoad(image);
      this.setState({ image });
    });
  }


  render () {
    const {
      useImgTag,
      circle,
      square,
      contained,
      cover,
      className,
      style,
      onClick,
      width,
      height,
      preloaderStyle,
      noPreloader,
      ...props,
    } = this.props;

    const {
      image,
    } = this.state;

    const wrap = (ele) => (circle || square) ? <Box>{ele}</Box> : ele;

    if(! image) {
      return wrap(
        <ImagePreloader
          noPreloader={noPreloader}
          width={width}
          height={height}
          style={preloaderStyle}
          circle={circle}
          onClick={onClick}
        />
      );
    }

    if(useImgTag) {
      return wrap(
        <ImageTag
          className={className}
          style={style}
          circle={circle}
          src={image}
          onClick={onClick}
          width={width}
          height={height}
        />
      );
    }

    return wrap(
      <ImageDiv
        className={className}
        style={style}
        contained={contained}
        cover={cover}
        circle={circle}
        src={image}
        onClick={onClick}
        width={width}
        height={height}
      />
    );
  }
}

Image.defaultProps = {
};

Image.propTypes = {
  square: React.PropTypes.bool,
  circle: React.PropTypes.bool,
  cover: React.PropTypes.bool,
  contained: React.PropTypes.bool,
  image: React.PropTypes.string,
  /**
   * Whether to use <img /> tag or not
   */
  useImgTag: React.PropTypes.bool,
  onLoad: React.PropTypes.func,
  width: React.PropTypes.any,
  height: React.PropTypes.any,
  preloaderStyle: React.PropTypes.object,
  noPreloader: React.PropTypes.bool,
};
