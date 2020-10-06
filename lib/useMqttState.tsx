import { useContext } from 'react';
import MqttContext from './Context';
import { IMqttContext as Context } from './types';

const useMqttState = () => {
	const { status, mqtt } = useContext<Context>(MqttContext);

	return {
		status,
		mqtt,
	};
};

export default useMqttState;
