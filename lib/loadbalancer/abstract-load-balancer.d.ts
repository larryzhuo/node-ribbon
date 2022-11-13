import { ChooseServerOption, Server } from '../interface';
import { ILoadBalancer } from './load-balancer';
export declare abstract class AbstractLoadBalancer implements ILoadBalancer {
    protected _servers: Server[];
    addServer(newServers: Server[]): void;
    abstract chooseServer(option: ChooseServerOption): Promise<Server>;
    getAllServers(): Promise<Server[]>;
}
