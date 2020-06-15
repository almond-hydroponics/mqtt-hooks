import * as React from 'react';
import MQTTPattern from 'mqtt-pattern';

import MqttContext from './Context';
import { MqttContext as Context } from './types';

const useSubscription = (topic: string) => {
  const {
    mqtt,
    status,
    message,
    setMessage,
  } = React.useContext<Context>(MqttContext);

  const subscribed = React.useMemo(() => mqtt?.subscribe(topic), [mqtt]);

  React.useEffect(() => {
    const getMessages = () => {
      subscribed?.once(
        'message',
        (t: string, message: { toString: () => string }) => {
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

          if (MQTTPattern.matches(topic, t)) setMessage(packet);
        },
      );
    };

    getMessages();
  }, [subscribed]);

  return {
    mqtt,
    status,
    topic,
    message,
  };
};

export default useSubscription;
