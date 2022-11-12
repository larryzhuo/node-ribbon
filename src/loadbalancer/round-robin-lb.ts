import _ from 'lodash';
import { Server, ChooseServerOption } from '../interface';
import logger from '../log/log';
import RibbonError from '../ribbon-error';
import { AbstractLoadBalancer } from './abstract-load-balancer';

/**
 * round-robin choose
 */
export class RoundRobinLB extends AbstractLoadBalancer {
  _count = 0;

  async chooseServer(option: ChooseServerOption): Promise<Server> {
    logger.info('option, %s', option);
    if (_.isEmpty(this._servers)) {
      throw new RibbonError('_servers null');
    }

    const len = this._servers.length;
    const index = (this._count + 1) % len;
    const server = this._servers[index];
    this._count = index;

    logger.info(`chooseServer %s:%s`, server.ip, server.port);
    return server;
  }
}
