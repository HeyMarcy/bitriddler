import React from 'react';
import { presets } from 'react-motion';
import Tabs from 'react-swipeable-tabs';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';

const Wrapper = styled.div`
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

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin: 24px;
`;

const SectionTitle = styled.h2`
`;

const TabsWrapper = styled.div`
  max-width: 600px;
  margin: 24px auto;
`;

const maxStiffness = 300;
const maxResistanceCoefficenet = 1;
const maxDamping = 50;
const maxSafeMargin = 200;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomItems = (no) => {
  const items = [];
  for (var i = 1; i <= no; i++) {
    items.push({ title: `Item ${i}` });
  }
  return items;
}

export default class SwipeableTabsPlayground extends React.Component {

  componentWillMount() {
    this.setState({
      activeItemIndex: 2,
      items: createRandomItems(14),
      presetKey: 'noWobble',
      topBorder: true,
      borderWidthRatio: 0.75,
    })
  }

  updateConfiguration = (config, rerender = false) => {
    if(rerender) {
      this.setState({
        hide: true,
      });

      setTimeout(() => {
        this.setState({
          hide: false,
          ...config,
        });
      });
    } else {
      this.setState({
        ...config,
      });
    }
  }

  renderTools() {
    const {
      presetKey,
      topBorder,
      borderWidthRatio,
      noFirstAndLastPadding,
      activeItemIndex,
      items,
    } = this.state;

    const {
      secondaryColor,
    } = this.props;

    return (
      <Controllers bgColor={secondaryColor}>
        <Controller>
          <SelectField
            fullWidth
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
          <SelectField
            fullWidth
            floatingLabelFixed
            floatingLabelText="Border width ratio"
            value={borderWidthRatio}
            onChange={(e, i, value) => this.updateConfiguration({ borderWidthRatio: value }, true)}
          >
            <MenuItem value={0.25} primaryText={"0.25"} />
            <MenuItem value={0.5} primaryText={"0.5"} />
            <MenuItem value={0.75} primaryText={"0.75"} />
            <MenuItem value={1} primaryText={"1"} />
          </SelectField>
        </Controller>
        <Controller>
          <SelectField
            fullWidth
            floatingLabelFixed
            floatingLabelText="Change active item"
            value={activeItemIndex}
            onChange={(e, i, value) => this.updateConfiguration({ activeItemIndex: value })}
          >
            {items.map((item, index) => (
              <MenuItem value={index} primaryText={item.title} />
            ))}
          </SelectField>
        </Controller>
        <Controller>
          <Toggle
            toggled={topBorder}
            label={'Top border'}
            onToggle={(_, isChecked) => this.updateConfiguration({ topBorder: isChecked })}
          />
        </Controller>
        <Controller>
          <Toggle
            toggled={noFirstAndLastPadding}
            label={'No first and last padding'}
            onToggle={(_, isChecked) => this.updateConfiguration({ noFirstAndLastPadding: isChecked }, true)}
          />
        </Controller>
      </Controllers>
    );
  }

  renderTabs() {
    const {
      presetKey,
      resistanceCoeffiecent,
      safeMargin,
      activeItemIndex,
      items,
      topBorder,
      borderWidthRatio,
      noFirstAndLastPadding,
      hide,
    } = this.state;

    const {
      primaryColor,
    } = this.props;

    if(hide) {
      return null;
    }

    return (
      <TabsWrapper>
        <Tabs
          noFirstLeftPadding={noFirstAndLastPadding}
          noLastRightPadding={noFirstAndLastPadding}
          fitItems={false}
          resistanceCoeffiecent={resistanceCoeffiecent}
          stiffness={presets[presetKey].stiffness}
          damping={presets[presetKey].damping}
          safeMargin={safeMargin}
          borderWidthRatio={borderWidthRatio}
          activeItemIndex={activeItemIndex}
          onItemClick={(item, index) => this.setState({ activeItemIndex: index })}
          items={items}
          borderPosition={topBorder ? 'top' : 'bottom'}
          borderThickness={2}
          borderColor={primaryColor}
          activeStyle={{
            color: primaryColor,
          }}
        />
      </TabsWrapper>
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderTools()}
        {this.renderTabs()}
      </Wrapper>
    );
  }
}
