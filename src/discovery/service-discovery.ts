import { EventEmitter } from 'events';
import { IAddressConfig, INacosNamingClientConfig } from '../interface';

export const ServerChangeEvent = 'ServerChangeEvent';
export abstract class AbstractServiceDiscovery extends EventEmitter {
  abstract init(opts: INacosNamingClientConfig | IAddressConfig): Promise<void>;

  abstract subscribe(
    info: string, // service info, if type is string, it's the serviceName
  ): Promise<void>;

  abstract unSubscribe(
    info: string, // service info, if type is string, it's the serviceName
  ): Promise<void>;

  abstract destroy(): Promise<void>;
}
