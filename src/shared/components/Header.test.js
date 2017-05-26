import React from 'react';
import { shallow, mount, describe } from 'enzyme';
import { render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Header } from './Header';

describe('<Header />', () => {
  it('Renders without crashing', () => {
    const routerp = function mockpush() {
      console.log('pushed');
    };
    const props1 = { displayName: 'Testing Guest', routerpush: routerp };
    shallow(<Header props={props1} />);
  });
});
