import { Server, ChooseServerOption } from './interface';
import { ILoadBalancer } from './load-balancer';

export abstract class AbstractLoadBalancer implements ILoadBalancer {
  private _servers: Server[] = [];

  public abstract addServer(newServers: Server[]): void;

  public abstract chooseServer(option: ChooseServerOption): Promise<Server>;

  public async getAllServers(): Promise<Server[]> {
    return this._servers;
  }
}
