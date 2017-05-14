import React from 'react';
import { presets } from 'react-motion';
import range from 'lodash/range';
import styled from 'utils/styled-components';
import CubeImageReveal from 'react-cube-image-reveal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'components/Layout/Paper';
import { getWindowWidth } from 'utils/screen';
import min from 'lodash/min';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  ${(props) => !props.isFirst ? `margin-left: 10px;` : ``}
  background: ${(props) => props.active ? props.primaryColor : '#333'};
  color: #FFF;
  border: 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const DemoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const Controllers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bgColor};
`;

const Controller = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
`;

export class CubeImageRevealPlayground extends React.Component {
  componentWillMount() {
    const width = min([600, getWindowWidth() - 24 * 2]);
    const height = width * 0.75;

    this.setState({
      animationType: 'fadeInFromCenter',
      inverseAnimation: true,
      piecesPerWidth: 6,
      image: 'https://cdn.geckoandfly.com/wp-content/uploads/2013/11/Self-Motivational-Quotes.jpg',
      springPresets: 'noWobble',
      width,
      height,
    });
  }

  resetAnimation(state) {
    this.setState({
      resetAnimation: true,
    });

    setTimeout(() => this.setState({
      ...state,
      inverseAnimation: false,
      resetAnimation: false,
    }), 100);
  }

  changeAnimation(animationType) {
    this.resetAnimation({
      animationType,
    });
  }

  changeSpringPresets(springPresets) {
    this.resetAnimation({
      springPresets,
    });
  }

  changePiecesPerWidth(piecesPerWidth) {
    this.resetAnimation({
      piecesPerWidth: Number(piecesPerWidth),
    });
  }

  render() {
    const {
      inverseAnimation,
      animationType,
      piecesPerWidth,
      resetAnimation,
      image,
      width,
      height,
      springPresets,
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
              <SelectField
                fullWidth
                floatingLabelFixed
                floatingLabelText="Animation type"
                value={animationType}
                onChange={(e, i, value) => this.changeAnimation(value)}
              >
                <MenuItem value={'simpleFadeIn'} primaryText={'simpleFadeIn'} />
                <MenuItem value={'fadeInFromCenter'} primaryText={'fadeInFromCenter'} />
                <MenuItem value={'fadeInToBottomRightEdge'} primaryText={'fadeInToBottomRightEdge'} />
                <MenuItem value={'rotateToBottomRightEdge'} primaryText={'rotateToBottomRightEdge'} />
                <MenuItem value={'rotateFromCenter'} primaryText={'rotateFromCenter'} />
                <MenuItem value={'rotateTopToBottom'} primaryText={'rotateTopToBottom'} />
              </SelectField>
            </Controller>
            <Controller>
              <SelectField
                fullWidth
                floatingLabelFixed
                floatingLabelText="Spring presets"
                value={springPresets}
                onChange={(e, i, value) => this.changeSpringPresets(value)}
              >
                <MenuItem value={'noWobble'} primaryText={'noWobble'} />
                <MenuItem value={'gentle'} primaryText={'gentle'} />
                <MenuItem value={'wobbly'} primaryText={'wobbly'} />
                <MenuItem value={'stiff'} primaryText={'stiff'} />
              </SelectField>
            </Controller>
            <Controller>
              <SelectField
                fullWidth
                floatingLabelFixed
                floatingLabelText="Pieces per width"
                value={piecesPerWidth}
                onChange={(e, i, value) => this.changePiecesPerWidth(value)}
              >
                {range(4, 20).map(val => (
                  <MenuItem value={val} primaryText={val} key={val} />
                ))}
              </SelectField>
            </Controller>
            <Controller>
              <Button
                primaryColor={primaryColor}
                isFirst
                active={inverseAnimation}
                onClick={() => this.setState({ inverseAnimation: !inverseAnimation })}
              >
                {inverseAnimation ? `Start animation` : `Inverse animation`}
              </Button>
            </Controller>
          </Paper>
        </Controllers>

        {!resetAnimation ?
          <DemoWrapper>
            <CubeImageReveal
              image={image}
              width={width}
              height={height}
              piecesPerWidth={piecesPerWidth}
              animationType={animationType}
              inverseAnimation={inverseAnimation}
              springConfig={presets[springPresets]}
            />
          </DemoWrapper> : null}
      </Wrapper>
    );
  }
}

CubeImageRevealPlayground.propTypes = {

};

CubeImageRevealPlayground.defaultProps = {

};

export default CubeImageRevealPlayground;
