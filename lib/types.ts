import { MqttClient } from 'mqtt';

export interface IMqttContext {
  status: string;
  mqtt: MqttClient | undefined;
}

export interface IUseSubscription {
  lastMessage?: IMessage;
  topic: string;
  mqtt?: MqttClient;
}

export interface IMessageStructure {
  [key: string]: string;
}

export interface IMessage {
  topic: string;
  message?: string | IMessageStructure;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
