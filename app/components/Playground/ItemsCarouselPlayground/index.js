import React from 'react';
import { presets } from 'react-motion';
import Measure from 'react-measure';
import ItemsCarousel from 'react-items-carousel/src/ItemsCarousel';
import range from 'lodash/range';
import styled from 'styled-components';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'components/Layout/Paper';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import {
  isSMScreen,
  isXSScreen,
} from 'utils/screen';
import { lightWhite } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DemoWrapper = styled(Paper)`
  min-height: 200px;
`;

const DemoTitle = styled.h2`
`;

const Controllers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background: ${(props) => props.bgColor};
`;

const Controller = styled.div`
  display: flex;
  margin: 0 auto;
  width: 320px;
  margin-bottom: 12px;
`;

const PlaceholderItem = styled.div`
  height: 200px;
  display: flex;
  background: #900;
  color: #FFF;
  align-items: center;
  justify-content: center;
`;

const SlideItem = styled.div`
  height: 200px;
  background: ${(props) => props.bgColor};
  color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SlideTitle = styled.h5`
`;

const SlideSubtitle = styled.h6`
  color: ${lightWhite};
`;

const titles = [
  'Totally',
  'Build with',
  'Psst!',
  'Placeholders',
];

const subtitles = [
  'customizable',
  'React motion',
  'Try on mobile!',
  'Can use placeholders until data loads',
];

const ItemButton = styled.div`
  padding: 20px;
  background: ${(props) => props.isActive ? '#900' : '#333'};
  color: #FFF;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
`;

export class ItemsCarouselPlayground extends React.Component {

  componentWillMount() {
    this.resetDefaultConfigurations();
  }

  resetDefaultConfigurations = () => {
    this.setState({
      presetKey: 'noWobble',
      numberOfCards: 3,
      slidesToScroll: 3,
      freeScrolling: false,
      showChevron: true,
      addFirstAndLastPadding: false,
      children: [],
      outsideChevron: true,
      totalNumberOfCards: 20,
      showSlither: true,
      activeItemIndex: 0,
      activePosition: 'left',
      gutter: 10,
    });

    setTimeout(() => {
      this.setState({
        children: this.createChildren(this.state.totalNumberOfCards, this.props.primaryColor),
      })
    }, 100);
  };

  isMobile = () => isSMScreen() || isXSScreen();

  updateConfiguration = (config) => {
    this.setState(config);
  };

  updateTotalNumberOfCards = (value) => {
    this.setState({
      children: this.createChildren(value, this.props.primaryColor),
    });
  };

  createChildren = (n, bgColor) => range(n).map(i => (
    <SlideItem bgColor={bgColor} key={i}>
      <SlideTitle>{titles[i] || (i + 1)}</SlideTitle>
      <SlideSubtitle>{subtitles[i]}</SlideSubtitle>
    </SlideItem>
  ));

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      presetKey,
      numberOfCards,
      slidesToScroll,
      freeScrolling,
      showChevron,
      addFirstAndLastPadding,
      children,
      outsideChevron,
      totalNumberOfCards,
      showSlither,
      activeItemIndex,
      activePosition,
      gutter,
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
                floatingLabelFixed
                floatingLabelText="Total number of children"
                value={totalNumberOfCards}
                onChange={(e, i, value) => this.updateTotalNumberOfCards(value)}
              >
                {range(30).map(val => (
                  <MenuItem key={val} value={val + 2} primaryText={val + 2} />
                ))}
              </SelectField>
            </Controller>
            <Controller>
              <SelectField
                floatingLabelFixed
                floatingLabelText="Number of cards"
                value={numberOfCards}
                onChange={(e, i, value) => this.updateConfiguration({ numberOfCards: value })}
              >
                {range(6).map(val => (
                  <MenuItem key={val} value={val + 2} primaryText={val + 2} />
                ))}
              </SelectField>
            </Controller>
            {/*<Controller>
              <SelectField
                floatingLabelFixed
                floatingLabelText="Slides to scroll"
                disabled={freeScrolling}
                value={slidesToScroll}
                onChange={(e, i, value) => this.updateConfiguration({ slidesToScroll: value })}
              >
                {range(6).map(val => (
                  <MenuItem key={val} value={val + 1} primaryText={val + 1} />
                ))}
              </SelectField>
            </Controller>*/}
            <Controller>
              <SelectField
                floatingLabelFixed
                floatingLabelText="Gutter"
                value={gutter}
                onChange={(e, i, gutter) => this.updateConfiguration({ gutter })}
              >
                {range(5).map(val => (
                  <MenuItem key={val} value={(val + 1) * 5} primaryText={(val + 1) * 5} />
                ))}
              </SelectField>
            </Controller>
            <Controller>
              <SelectField
                floatingLabelFixed
                floatingLabelText="Active position"
                value={activePosition}
                onChange={(e, i, value) => this.updateConfiguration({ activePosition: value })}
              >
                <MenuItem value={'left'} primaryText={'left'} />
                <MenuItem value={'center'} primaryText={'center'} />
                <MenuItem value={'right'} primaryText={'right'} />
              </SelectField>
            </Controller>
            <Controller>
              <SelectField
                floatingLabelFixed
                floatingLabelText="Spring presets"
                value={presetKey}
                onChange={(e, i, value) => this.updateConfiguration({ presetKey: value })}
              >
                <MenuItem value={'noWobble'} primaryText={'noWobble'} />
                <MenuItem value={'gentle'} primaryText={'gentle'} />
                <MenuItem value={'wobbly'} primaryText={'wobbly'} />
                <MenuItem value={'stiff'} primaryText={'stiff'} />
              </SelectField>
            </Controller>
            <Controller>
              <Toggle
                toggled={freeScrolling}
                label={'Free scrolling'}
                onToggle={(_, isChecked) => this.updateConfiguration({ freeScrolling: isChecked })}
              />
            </Controller>
            <Controller>
              <Toggle
                toggled={showChevron}
                label={'Show Chevrons'}
                onToggle={(_, isChecked) => this.updateConfiguration({ showChevron: isChecked })}
              />
            </Controller>
            <Controller>
              <Toggle
                toggled={addFirstAndLastPadding}
                label={'Add first and last padding'}
                onToggle={(_, isChecked) => this.updateConfiguration({ addFirstAndLastPadding: isChecked })}
              />
            </Controller>
            <Controller>
              <Toggle
                toggled={showSlither}
                label={'Show slither of next item'}
                onToggle={(_, isChecked) => this.updateConfiguration({ showSlither: isChecked })}
              />
            </Controller>
            <Controller>
              <Toggle
                toggled={outsideChevron}
                label={'Outside chevron'}
                onToggle={(_, isChecked) => this.updateConfiguration({ outsideChevron: isChecked })}
              />
            </Controller>
          </Paper>
        </Controllers>
        <DemoWrapper>
          <ItemsCarousel
            numberOfCards={numberOfCards}
            freeScrolling={freeScrolling}
            showSlither={showSlither}
            firstAndLastGutter={addFirstAndLastPadding}
            gutter={gutter}

            enablePlaceholder
            minimumPlaceholderTime={2000}
            numberOfPlaceholderItems={6}
            appShellItem={<PlaceholderItem />}

            rightChevron={showChevron && <div>&#10097;</div>}
            leftChevron={showChevron && <div>&#10096;</div>}
            chevronWidth={showChevron ? gutter * 2 : 0}
            outsideChevron={outsideChevron}

            springConfig={presets[presetKey]}

            // Active item configurations
            requestToChangeActive={this.changeActiveItem}
            activeItemIndex={activeItemIndex}
            activePosition={activePosition}
            children={children}
          />
        </DemoWrapper>
        <Paper>
          <ButtonsWrapper>
            {range(totalNumberOfCards).map((item, index) => (
              <ItemButton isActive={index === activeItemIndex} onClick={() => this.changeActiveItem(index)} key={index}>
                {index + 1}
              </ItemButton>
            ))}
          </ButtonsWrapper>
        </Paper>
      </Wrapper>
    );
  }
}

ItemsCarouselPlayground.propTypes = {

};

ItemsCarouselPlayground.defaultProps = {

};

export default ItemsCarouselPlayground;
