import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class TransportFactory {
  /**
   * http use axios
   * @param config
   * @returns
   */
  static createHttpClient(config?: AxiosRequestConfig): AxiosInstance {
    return axios.create(config);
  }

  static createTcpClient() {}
}
