import * as React from 'react';
import MqttContext from './Context';
import { MqttContext as Context } from './types';

const useMqttState = () => {
  const { status, mqtt, message } = React.useContext<Context>(MqttContext);

  return {
    status,
    mqtt,
    message,
  };
};

export default useMqttState;
