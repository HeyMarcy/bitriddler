import React from 'react';
import styled from 'utils/styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import BottomSheetModal from 'react-bottom-sheet';

const Wrapper = styled.div`
  display: flex;
`;

const Controllers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Controller = styled.div`
  margin: 24px;
`;

export class BottomSheetPlayground extends React.Component {
  componentWillMount() {
    this.setState({
      showLarge: false,
      showSmall: false,
    });
  }

  render() {
    return (
      <div>
        <Controllers>
          <Controller>
            <RaisedButton
              label={'Show small content modal'}
              onClick={() => this.setState({ showSmall: !this.state.showSmall })}
            />
          </Controller>
          <Controller>
            <RaisedButton
              label={'Show large content modal'}
              onClick={() => this.setState({ showLarge: !this.state.showLarge })}
            />
          </Controller>
        </Controllers>

        <BottomSheetModal zIndex={10000} open={this.state.showSmall} onRequestClose={() => this.setState({ showSmall: false })}>
          <div>
            <h3>Bottom sheet modal content</h3>
            <ul>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
            </ul>
            <br />
            <br />
            <br />
          </div>
        </BottomSheetModal>

        <BottomSheetModal zIndex={10000} open={this.state.showLarge} onRequestClose={() => this.setState({ showLarge: false })}>
          <div>
            <h3>Bottom sheet modal content</h3>
            <RaisedButton
              label={'Click me to close the modal'}
               onClick={() => this.setState({ showLarge: !this.state.showLarge })}
            />
            <ul>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
              <li>Animates from bottom to top</li>
              <li>If the content height is more than the height of the device it will be scrollable.</li>
              <li>Clicking on the grey area will close the modal</li>
            </ul>
            <br />
            <br />
            <br />
          </div>
        </BottomSheetModal>
      </div>
    );
  }
}

BottomSheetPlayground.propTypes = {

};

BottomSheetPlayground.defaultProps = {

};

export default BottomSheetPlayground;
