import * as React from 'react';
import { shallow } from 'enzyme';
import { EventEmitter } from 'events';
import { Connector } from '../index';

describe('Connector', () => {
  const div_id = 'content';
  it('should render children', () => {
    const mockMqtt = new EventEmitter();
    const mounted = shallow(
      <Connector brokerUrl={mockMqtt}>
        <div id={div_id}/>
      </Connector>,
    );
    expect(mounted.find(`div#${div_id}`).length === 1);
  });
});
