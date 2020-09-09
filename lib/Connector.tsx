import React, { useEffect, useState } from 'react';
import { connect, MqttClient } from 'mqtt';

import MqttContext from './Context';
import { ConnectorProps } from './interfaces';

const Connector = ({ brokerUrl, children, options = {} }: ConnectorProps) => {
  const [status, setStatus] = useState<string>('offline');
  const [mqtt, setMqtt] = useState<MqttClient>();

  useEffect(() => {
    const mqttInstance = connect(brokerUrl, options);
    setMqtt(mqttInstance);
    mqttInstance.on('connect', () => setStatus('connected'));
    mqttInstance.on('reconnect', () => setStatus('reconnecting'));
    mqttInstance.on('close', () => setStatus('closed'));
    mqttInstance.on('error', error => setStatus(error.message));

    return () => {
      mqttInstance.end();
    };
  }, [brokerUrl]);

  return (
    <MqttContext.Provider value={{ status, mqtt }}>
      {children}
    </MqttContext.Provider>
  );
};

export default Connector;
