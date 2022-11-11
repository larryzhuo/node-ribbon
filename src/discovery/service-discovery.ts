import { EventEmitter } from 'events';

export abstract class AbstractServiceDiscovery extends EventEmitter {
  protected ServerChangeEvent = 'ServerChangeEvent';

  abstract init(): Promise<void>;

  abstract destroy(): Promise<void>;
}
