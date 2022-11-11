import { EventEmitter } from 'events';
import { IAddressConfig, INacosNamingClientConfig } from '../interface';

export abstract class AbstractServiceDiscovery extends EventEmitter {
  protected ServerChangeEvent = 'ServerChangeEvent';

  abstract init(opts: INacosNamingClientConfig | IAddressConfig): Promise<void>;

  abstract destroy(): Promise<void>;
}
