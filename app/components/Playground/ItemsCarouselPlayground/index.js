import React from 'react';
import { presets } from 'react-motion';
import Measure from 'react-measure';
import ItemsCarousel from 'react-items-carousel';
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

const AppShellItem = styled.div`
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


export class ItemsCarouselPlayground extends React.Component {

  componentWillMount() {
    this.resetDefaultConfigurations();
  }

  resetMobileConfigurations = () => {
    this.setState({
      children: [],

      totalNumberOfCards: 10,
      presetKey: 'noWobble',
      numberOfCards: 2,
      slidesToScroll: 2,
      freeScrolling: true,
      disableScrolling: false,
      showChevron: false,
      addFirstAndLastPadding: true,
      outsideChevron: false,

      hide: true,
    });

    setTimeout(() => {
      this.setState({
        hide: false,
        children: this.createChildren(this.state.totalNumberOfCards, this.props.primaryColor),
      })
    }, 100);
  };

  resetDesktopConfigurations = () => {
    this.setState({
      children: [],

      totalNumberOfCards: 20,
      presetKey: 'noWobble',
      numberOfCards: 5,
      slidesToScroll: 5,
      freeScrolling: false,
      disableScrolling: false,
      showChevron: true,
      addFirstAndLastPadding: false,
      outsideChevron: true,

      hide: true,
    });

    setTimeout(() => {
      this.setState({
        hide: false,
        children: this.createChildren(this.state.totalNumberOfCards, this.props.primaryColor),
      })
    }, 100);
  };

  isMobile = () => isSMScreen() || isXSScreen();

  resetDefaultConfigurations = () => {
    this.isMobile() ? this.resetMobileConfigurations() : this.resetDesktopConfigurations();
  };

  updateConfiguration = (config) => {
    this.setState({
      hide: true,
    });
    setTimeout(() => {
      this.setState({
        hide: false,
        ...config,
      });
    }, 100);
  };

  updateTotalNumberOfCards = (value) => {
    this.setState({
      children: [],
    });
    setTimeout(() => {
      this.setState({
        totalNumberOfCards: value,
        children: this.createChildren(value, this.props.primaryColor),
      });
    }, 100);
  };

  createChildren = (n, bgColor) => range(n).map(i => (
    <SlideItem bgColor={bgColor} key={i}>
      <SlideTitle>{titles[i] || (i + 1)}</SlideTitle>
      <SlideSubtitle>{subtitles[i]}</SlideSubtitle>
    </SlideItem>
  ));

  render() {
    const {
      presetKey,
      numberOfCards,
      slidesToScroll,
      freeScrolling,
      disableScrolling,
      showChevron,
      addFirstAndLastPadding,
      hide,
      children,
      outsideChevron,
      totalNumberOfCards,
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
                floatingLabelText="Total number of cards"
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
            <Controller>
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
                toggled={disableScrolling}
                label={'Disable scrolling'}
                onToggle={(_, isChecked) => this.updateConfiguration({ disableScrolling: isChecked })}
              />
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
                toggled={outsideChevron}
                label={'Outside chevron'}
                onToggle={(_, isChecked) => this.updateConfiguration({ outsideChevron: isChecked })}
              />
            </Controller>
            <Controller>
              <RaisedButton
                label={'Reset configurations'}
                onClick={this.resetDefaultConfigurations}
              />
            </Controller>
          </Paper>
        </Controllers>
        <DemoWrapper noHorizontalPadding={addFirstAndLastPadding}>
          {
            !hide &&
            <ItemsCarousel
              freeScrolling={freeScrolling}
              disableScrolling={disableScrolling}

              firstItemGutter={addFirstAndLastPadding ? 24 : 0}
              lastItemGutter={addFirstAndLastPadding ? 24 : 0}
              gutter={12}

              enableAppShell
              minimumAppShellTime={2000}
              numberOfShellItems={6}
              appShellItem={<AppShellItem />}

              numberOfCards={numberOfCards}
              slidesToScroll={slidesToScroll}

              outsideChevron={outsideChevron}
              chevronWidth={showChevron ? 24 : 0}
              rightChevron={showChevron && <div>&#10097;</div>}
              leftChevron={showChevron && <div>&#10096;</div>}

              centerExactly

              springConfig={presets[presetKey]}
            >
              {children}
            </ItemsCarousel>
          }
        </DemoWrapper>
        }
      </Wrapper>
    );
  }
}

ItemsCarouselPlayground.propTypes = {

};

ItemsCarouselPlayground.defaultProps = {

};

export default ItemsCarouselPlayground;
