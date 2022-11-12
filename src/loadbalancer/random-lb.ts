import _ from 'lodash';
import { ChooseServerOption, Server } from '../interface';
import logger from '../log/log';
import RibbonError from '../ribbon-error';
import { AbstractLoadBalancer } from './abstract-load-balancer';

/**
 * random choose
 */
export class RandomLB extends AbstractLoadBalancer {
  async chooseServer(option: ChooseServerOption): Promise<Server> {
    logger.info('option, %s', option);
    if (_.isEmpty(this._servers)) {
      throw new RibbonError('_servers null');
    }

    const len = this._servers.length;
    const index = Math.floor(Math.random() * len);
    const server = this._servers[index];

    logger.info(`chooseServer %s:%s`, server.ip, server.port);
    return server;
  }
}
