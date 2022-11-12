import { ChooseServerOption, Server } from '../interface';

export interface ILoadBalancer {
  /**
   * Initial list of servers.
   * @param newServers
   */
  addServer: (newServers: Server[]) => void;

  /**
   * Choose a server from load balancer
   * @param option
   */
  chooseServer: (option: ChooseServerOption) => Promise<Server>;

  /**
   * get server list
   */
  getAllServers: () => Promise<Server[]>;
}
