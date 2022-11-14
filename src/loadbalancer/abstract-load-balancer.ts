import { ChooseServerOption, Server } from '../interface';
import { ILoadBalancer } from './load-balancer';

export abstract class AbstractLoadBalancer implements ILoadBalancer {
  protected _servers: Server[] = [];

  addServer(newServers: Server[]): void {
    this._servers = newServers;
  }

  abstract chooseServer(option: ChooseServerOption): Promise<Server>;

  getAllServers(): Server[] {
    return this._servers;
  }
}
