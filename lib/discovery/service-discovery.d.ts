/// <reference types="node" />
import { EventEmitter } from 'events';
import { IAddressConfig, INacosNamingClientConfig } from '../interface';
export declare const ServerChangeEvent = "ServerChangeEvent";
export declare abstract class AbstractServiceDiscovery extends EventEmitter {
    abstract init(opts: INacosNamingClientConfig | IAddressConfig): Promise<void>;
    abstract subscribe(info: string): Promise<void>;
    abstract unSubscribe(info: string): Promise<void>;
    abstract destroy(): Promise<void>;
}
