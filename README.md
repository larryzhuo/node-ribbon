## Introduce

A Node.js client side IPC library for microservice, like Java [Netflix Ribbon](https://github.com/Netflix/ribbon) , support

1. HTTP protocol call
2. load balance: Random, RoundRibbon
3. service discovery support [nacos](https://github.com/alibaba/nacos)

## 介绍

这是一个客户端负载均衡 IPC 库，为微服务场景设计， 参照 Java [Netflix Ribbon](https://github.com/Netflix/ribbon)。 目前支持:

1. HTTP 协议调用； 可扩展
2. 负载均衡支持两种算法： 随机， 轮训； 可扩展
3. 服务发现支持 [nacos](https://github.com/alibaba/nacos)
4. 支持纯服务地址列表
5. 支持 fallback

## 用法

### nacos demo

```typescript
//sleep util function
async function sleep(time) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

//create service discovery
let nacosIns = await ServiceDiscoveryFactory.createDiscovery({
  type: ServiceDiscoveryTypeEnum.Nacos,
  option: {
    logger,
    serverList: '127.0.0.1:8849',
    namespace: 'public',
  },
});

//create loadbalancer
const lbIns = LoadBalancerFactory.getLoadBalancer({ type: LoadBalancerEnum.Random });

//create ribbon instance
const ribbonIns = new RibbonBuilder({
  service: {
    type: ServiceNameTypeEnum.Name,
    serviceName: 'provider',
  },
})
  .withLoadBalancer(lbIns)
  .withServiceDiscovery(nacosIns)
  .build();

//wait for setup
await ribbonIns.setup();

//get http client
const httpClient = await ribbonIns.getHttpClient({
  fallback: (err) => {
    console.log('req err:', err);
  },
});
await sleep(3000);

try {
  //send request
  for (let i = 0, ilen = 10; i < ilen; i++) {
    const ret = await httpClient.get('/hello');
    console.log('random ret:', ret.data);
  }
} catch (e) {
  console.error(e);
}
```

## 测试用例

1. node ./test/server.js
2. npm run test
