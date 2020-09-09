import React from 'react';
import { IClientOptions } from 'mqtt';

export interface ConnectorProps {
  brokerUrl?: string | object;
  children: React.ReactNode;
  options?: IClientOptions | undefined;
}
