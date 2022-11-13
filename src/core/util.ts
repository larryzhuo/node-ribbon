import { Server } from '../interface';
import RibbonError from '../ribbon-error';

/**
 * 从 '192.168.1.1:7001' 中提取信息
 * @param addr
 * @returns
 */
export function formatAddress(addr: string): Server {
  if (!addr) {
    throw new RibbonError('addr format error');
  }
  addr = addr.trim();
  const kvs = addr.split(':');
  const server: Server = {
    ip: kvs[0],
    port: parseInt(kvs[1]),
  };
  return server;
}
