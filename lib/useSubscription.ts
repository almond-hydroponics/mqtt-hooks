import * as React from "react";
import MQTTPattern from "mqtt-pattern";
import uuid from "uuid";

import MqttContext from "./Context";
import { MqttContext as Context } from "./types";

const useSubscription = <T>(topic: string) => {
  const {
    mqtt,
    status,
    messages,
    addMessage,
    lastMessage
  } = React.useContext<Context<T>>(MqttContext);

  const subscribed = React.useMemo(() => mqtt?.subscribe(topic), [mqtt]);

  React.useEffect(() => {
    const getMessages = () => {
      subscribed?.once(
        "message",
        (t: string, message: { toString: () => string }) => {
          let subMessage;
          try {
            subMessage = JSON.parse(message.toString());
          } catch (e) {
            subMessage = message.toString();
          }

          const packet = {
            message: subMessage,
            topic: t,
            id: uuid.v4()
          };

          if (MQTTPattern.matches(topic, t)) addMessage(packet);
        }
      );
    };

    getMessages();
  }, [subscribed, messages]);

  const subMessages = messages.filter(message => MQTTPattern.matches(topic, message.topic));
  const lastMessageOnTopic = subMessages[subMessages.length - 1];

  return {
    subMessages,
    mqtt,
    status,
    lastMessage,
    lastMessageOnTopic,
    topic
  };
};

export default useSubscription;
