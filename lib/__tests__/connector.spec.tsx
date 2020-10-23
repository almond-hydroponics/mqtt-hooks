import { renderHook, act } from '@testing-library/react-hooks';

import { URL, options } from './connection';
import { Connector, useMqttState } from '../index';

let wrapper: ({ children }: { children: any; }) => JSX.Element;

describe('Connector wrapper', () => {
  beforeAll(() => {
    wrapper = ({ children }) => (
      <Connector brokerUrl={URL} opts={options}>
        {children}
      </Connector>
    );
  });

  it('should not connect with mqtt with a wrong url', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMqttState(), {
      wrapper: ({ children }) => (
        <Connector brokerUrl="mqtt://192.168.1.12:1884">{children}</Connector>
      ),
    });
    await waitForNextUpdate();
    act(() => {
      result.current.mqtt?.end();
    });
    expect(result.current.status).toBe('closed');
  }, 300000);

  it('should connect with mqtt successfully', async () => {
    const { result, waitFor } = renderHook(() => useMqttState(), {
      wrapper,
    });
    await waitFor(() => result.current.mqtt?.connected === true);
    expect(result.current.status).toBe('connected');

    act(() => {
      result.current.mqtt?.end();
    });
    await waitFor(() => result.current.mqtt?.connected === false);
    expect(result.current.status).toBe('closed');
  });

  it('should connect with passing props', async () => {
    const { result, waitFor } = renderHook(() => useMqttState(), {
      wrapper: ({ children }) => (
        <Connector brokerUrl={URL} opts={{ keepalive: 0 }}>
          {children}
        </Connector>
      ),
    });
    await waitFor(() => result.current.mqtt?.connected === true);
    expect(result.current.status).toBe('connected');

    act(() => {
      result.current.mqtt?.end();
    });
    await waitFor(() => result.current.mqtt?.connected === false);
    expect(result.current.status).toBe('closed');
  });

  it('should get status reconnecting', async () => {
    const { result, waitFor } = renderHook(() => useMqttState(), {
      wrapper,
    });
    await waitFor(() => result.current.mqtt?.connected === true);
    act(() => {
      result.current.mqtt?.reconnect();
    });
    // await waitFor(() => result.current.mqtt?.reconnecting === true);
    expect(result.current.status).toBe('reconnecting');

    act(() => {
      result.current.mqtt?.end();
    });
    await waitFor(() => result.current.mqtt?.connected === false);
    expect(result.current.status).toBe('closed');
  });
});
