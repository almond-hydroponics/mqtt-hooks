import { useEffect, useState } from 'react';
import { connect, MqttClient } from 'mqtt';

import MqttContext from './Context';
import { ConnectorProps } from './interfaces';

const Connector = ({ brokerUrl, children, opts = {} }: ConnectorProps) => {
	const [status, setStatus] = useState<string>('offline');
	const [mqtt, setMqtt] = useState<MqttClient>();

	useEffect(() => {
		const client = connect(brokerUrl, opts);
		setMqtt(client);
		client.on('connect', () => setStatus('connected'));
		client.on('reconnect', () => setStatus('reconnecting'));
		client.on('close', () => setStatus('closed'));
		client.on('error', (error) => setStatus(error.message));

		return () => {
			client.end();
		};
	}, [brokerUrl]);

	return (
		<MqttContext.Provider value={{ status, mqtt }}>
			{children}
		</MqttContext.Provider>
	);
};

export default Connector;
