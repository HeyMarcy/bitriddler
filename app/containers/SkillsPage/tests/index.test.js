import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import SkilsPage from '../index';
import messages from '../messages';

describe('<SkilsPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <SkilsPage />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
