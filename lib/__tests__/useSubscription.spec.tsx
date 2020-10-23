import { renderHook } from '@testing-library/react-hooks';

import { Connector, useSubscription } from '../../lib';
import { URL, options } from './connection';

const TOPIC = 'almond/test';

let wrapper: ({ children }: { children: any; }) => JSX.Element;

describe('useSubscription', () => {
  beforeAll(() => {
    wrapper = ({ children }) => (
      <Connector brokerUrl={URL} opts={options}>
        {children}
      </Connector>
    );
  });

  it('should get message on topic almond/test', async () => {
    const { result, waitForValueToChange, waitForNextUpdate } = renderHook(
      () => useSubscription(TOPIC),
      {
        wrapper,
      },
    );

    await waitForValueToChange(() => result.current.mqtt?.connected === true);
    const message = 'testing message';
    result.current.mqtt?.publish(TOPIC, message);
    await waitForNextUpdate();
    expect(result.current.lastMessage?.message).toBe(message);
    result.current.mqtt?.end();
    await waitForValueToChange(() => result.current.mqtt?.connected === false);
  });

  it('should get message on topic with single selection of the path + ', async () => {
    const { result, waitFor, waitForNextUpdate } = renderHook(
      () => useSubscription(`${TOPIC}/+/test/+/selection`),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.mqtt?.connected === true);
    const message = 'testing single selection message';
    result.current.mqtt?.publish(`${TOPIC}/match/test/single/selection`, message);
    await waitForNextUpdate();
    expect(result.current.lastMessage?.message).toBe(message);
    result.current.mqtt?.end();
    await waitFor(() => result.current.mqtt?.connected === false);
  });

  it('should get message on topic with # wildcard', async () => {
    const { result, waitFor, waitForNextUpdate } = renderHook(
      () => useSubscription(`${TOPIC}/#`),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.mqtt?.connected === true);
    const message = 'testing with # wildcard';
    result.current.mqtt?.publish(`${TOPIC}/match/test/wildcard`, message);
    await waitForNextUpdate();
    expect(result.current.lastMessage?.message).toBe(message);
    result.current.mqtt?.end();
    await waitFor(() => result.current.mqtt?.connected === false);
  });
});
