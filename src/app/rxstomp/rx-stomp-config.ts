import { RxStompConfig } from '@stomp/rx-stomp';

export const rxStompConfig: RxStompConfig = {
  brokerURL: 'http://localhost:8080/chess-websocket',

  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 0,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
