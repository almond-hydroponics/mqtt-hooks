import * as React from "react";
import MqttContext from "./Context";
import { MqttContext as Context } from "./types";

const useMqttState = <T>() => {
  const {
    status,
    mqtt,
    messages: allMessages,
    lastMessage
  } = React.useContext<Context<T>>(MqttContext);

  return {
    status,
    mqtt,
    allMessages,
    lastMessage
  };
};

export default useMqttState;
