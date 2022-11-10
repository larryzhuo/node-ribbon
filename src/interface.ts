import { ClusterNode, RedisOptions } from 'ioredis';

export enum StorageTypeEnum {
  memory = 'memory',
  redis = 'redis',
}

export interface IThrottlerStorageOption {
  type: StorageTypeEnum;
  options?: IRedisOption;
}

export interface IThrottlerOption {
  /**
   * The amount of requests that are allowed within the ttl's time window.
   */
  limit?: number;

  /**
   * The amount of seconds of how many requests are allowed within this time.
   */
  ttl?: number;

  /**
   * The storage class to use where all the record will be stored in.
   */
  storage?: IThrottlerStorageOption;
}

export interface IRedisClusterOption {
  cluster?: boolean;
  nodes?: ClusterNode[];
}

export interface IRedisOption extends RedisOptions, IRedisClusterOption {
  ttl?: number; // key expire ttl, default 60s
}
