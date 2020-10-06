import { ReactNode } from 'react';
import { IClientOptions } from 'mqtt';

export interface ConnectorProps {
	brokerUrl?: string | object;
	children: ReactNode;
	opts?: IClientOptions | undefined;
}
