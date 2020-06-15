import * as React from "react";
import { connect, MqttClient } from "mqtt";

import MqttContext from "./Context";
import { ConnectorProps } from "./interfaces";
import { Message, MessageStructure } from "./types";

const Connector = ({ brokerUrl, children, opts }: ConnectorProps) => {
  const [status, setStatus] = React.useState<string>("offline");
  const [mqtt, setMqtt] = React.useState<MqttClient>();
  const [messages, setMessages] = React.useState<Message<MessageStructure>[]>([]);

  React.useEffect(() => {
    const mqttInstance = connect(brokerUrl, opts);
    setMqtt(mqttInstance);
    mqttInstance.on("connect", () => setStatus("connected"));
    mqttInstance.on("reconnect", () => setStatus("reconnecting"));
    mqttInstance.on("close", () => setStatus("closed"));
    mqttInstance.on("offline", () => setStatus("offline"));

    return () => {
      mqttInstance.end();
    };
  }, []);

  const addMessage = React.useCallback((message: Message<{}>) => {
    setMessages(state => [...state, message]);
  }, []);

  const lastMessage = messages[messages.length - 1];

  return (
    <MqttContext.Provider
      value={{ status, mqtt, addMessage, messages, lastMessage }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export default Connector;
