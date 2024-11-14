import { RxStomp } from '@stomp/rx-stomp';
import { rxStompConfig } from './rx-stomp-config';

export function rxStompServiceFactory() {
  const rxStomp = new RxStomp();
  rxStomp.configure(rxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
