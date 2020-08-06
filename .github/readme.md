<div align="center">

## mqtt-react-hooks

[![CircleCI](https://circleci.com/gh/almond-hydroponics/mqtt-hooks.svg?style=svg)](https://circleci.com/gh/almond-hydroponics/mqtt-hooks)
[![Maintainability](https://api.codeclimate.com/v1/badges/211bd4e833103573e2d1/maintainability)](https://codeclimate.com/github/almond-hydroponics/mqtt-hooks/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/211bd4e833103573e2d1/test_coverage)](https://codeclimate.com/github/almond-hydroponics/mqtt-hooks/test_coverage)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/almond-hydroponics/mqtt-hooks.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/almond-hydroponics/mqtt-hooks/context:javascript)

</div>

<div align="center">

    Pub/Sub communication with an MQTT broker using React Hooks

  [![Almond](../public/readme.svg)](https://almond-re-staging.herokuapp.com/)

  #### Simple but complicated mqtt hook

</div>

## Overview
This library is focused to help you to connect, publish and subscribe to a Message Queuing Telemetry Transport (MQTT) in ReactJS with the power of React Hooks.
The library is a modification of mqtt-react-hooks found [here](https://github.com/VictorHAS/mqtt-react-hooks).

## Flow of Data
1. WiFi or other mobile sensors publish data to an MQTT broker
2. ReactJS subscribes to the MQTT broker and receives the data using MQTT.js
3. React's state is updated, and the data is passed down to stateless components

## Hooks Available
- useMqttState -> return { status, mqtt, allMessages, lastMessage }
- useSubscription(topic) -> return { msgs, mqtt, status, lastMessage, lastMessageOnTopic }

### Usage
Currently, mqtt-react-hooks exports one enhancers.
Similarly to react-redux, you'll have to first wrap a root component with a
```Connector``` which will initialize the mqtt instance.
