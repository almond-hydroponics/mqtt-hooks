import * as React from 'react';
import { connect, MqttClient } from 'mqtt';

import MqttContext from './Context';
import { ConnectorProps } from './interfaces';
import { Message } from './types';

const Connector = ({ brokerUrl, children, opts }: ConnectorProps) => {
  const [status, setStatus] = React.useState<string>('offline');
  const [mqtt, setMqtt] = React.useState<MqttClient>();
  const [message, setMessage] = React.useState<Message>({} as Message);

  React.useEffect(() => {
    const mqttInstance = connect(brokerUrl, opts);
    setMqtt(mqttInstance);
    mqttInstance.on('connect', () => setStatus('connected'));
    mqttInstance.on('reconnect', () => setStatus('reconnecting'));
    mqttInstance.on('close', () => setStatus('closed'));
    mqttInstance.on('offline', () => setStatus('offline'));

    return () => {
      mqttInstance.end();
    };
  }, []);

  return (
    <MqttContext.Provider value={{ status, mqtt, message, setMessage }}>
      {children}
    </MqttContext.Provider>
  );
};

export default Connector;
