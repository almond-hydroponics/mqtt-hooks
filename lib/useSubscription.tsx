import { useState, useContext, useEffect } from 'react';
import MQTTPattern from 'mqtt-pattern';

import { IClientSubscribeOptions } from 'mqtt';
import MqttContext from './Context';
import { IMessage, IMqttContext as Context, IUseSubscription } from './types';

const useSubscription = (
	topic: string,
	options: IClientSubscribeOptions = {} as IClientSubscribeOptions,
): IUseSubscription => {
	const { mqtt } = useContext<Context>(MqttContext);
	const [lastMessage, setMessage] = useState<IMessage | undefined>();

	useEffect(() => {
		mqtt
			?.subscribe(topic, options)
			.on('message', (t: string, message: { toString: () => string }) => {
				let subMessage: string;
				try {
					subMessage = JSON.parse(message.toString());
				} catch (e) {
					subMessage = message.toString();
				}

				const packet = {
					message: subMessage,
					topic: t,
				};

				if (MQTTPattern.matches(topic, t)) {
					setMessage(packet);
				}
			});

		return () => {
			mqtt?.unsubscribe(topic);
		};
	}, [mqtt, options, topic]);

	return {
		mqtt,
		topic,
		lastMessage,
	};
};

export default useSubscription;
