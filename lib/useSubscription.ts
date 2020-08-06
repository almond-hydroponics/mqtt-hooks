import * as React from 'react';
import MQTTPattern from 'mqtt-pattern';

import MqttContext from './Context';
import { MqttContext as Context } from './types';

const useEffectAsync = (
  effect: any,
  inputs: React.DependencyList | undefined,
) => {
  React.useEffect(() => {
    effect();
  }, inputs);
};

const useSubscription = (topic: string) => {
  const {
    mqtt,
    status,
    message,
    setMessage,
  } = React.useContext<Context>(MqttContext);

  const subscribed = React.useMemo(() => mqtt?.subscribe(topic), [mqtt]);

  useEffectAsync(async () => {
    const getMessages = () => {
      subscribed?.on(
        'message',
        (t: string, messages: { toString: () => string }) => {
          let subMessage: string;
          try {
            subMessage = JSON.parse(messages.toString());
          } catch (e) {
            subMessage = messages.toString();
          }

          const packet = {
            message: subMessage,
            topic: t,
          };

          if (MQTTPattern.matches(topic, t)) {
            setMessage(packet);
          }
        },
      );
    };

    await getMessages();
  }, [subscribed, message]);

  // const msg = message.filter((message: any) => MQTTPattern.matches(topic, message.topic))
  // const msg = MQTTPattern.matches(topic, message.topic)

  return {
    mqtt,
    status,
    topic,
    message,
  };
};

export default useSubscription;
