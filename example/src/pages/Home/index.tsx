import React from 'react';
// import { Button } from 'antd';
//
// import styles from './Home.module.less'

import { Connector } from '../../../../lib';
import Status from '../Status';

const Home = () => {
  const options = {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
    keepalive: 30,
    clientId: 'almond',
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: false,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    // will: {
    //   topic: 'almond/lastWill',
    //   payload: 'Connection Closed abnormally..!',
    //   qos: 0,
    //   retain: false,
    // },
    // key: bufferKey,
    // cert: bufferCert,
    // ca: bufferCA,
    rejectUnauthorized: false,
  };

  return (
    // <main className={styles.app}>
    //   <Button type="primary">Hello, Ant Design!</Button>
    //   <a href="foo.bar">I'm a link. Click me, please!</a>
    // </main>
    <Connector
      brokerUrl={`mqtts://${process.env.MQTT_HOST}:${parseInt(process.env.MQTT_PORT as string, 10)}`}
      opts={options}
    >
      <Status />
    </Connector>
  );
};

export default Home;
