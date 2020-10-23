import { useSubscription, useMqttState } from 'mqtt-hooks';

const Status = () => {
  // eslint-disable-next-line
  const { mqtt } = useSubscription('almond/data');
  const { status } = useMqttState();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h4>{status}</h4>
      {/*{msgs?.map(message => (*/}
      {/*  <span key={message.id}>*/}
      {/*      {`topic:${message.topic} - message: ${JSON.stringify(*/}
      {/*        message.message*/}
      {/*      )}`}*/}
      {/*    </span>*/}
      {/*))}*/}
    </div>
  );
};

export default Status;
