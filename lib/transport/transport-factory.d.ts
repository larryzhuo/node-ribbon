import { AxiosInstance, AxiosRequestConfig } from 'axios';
export declare class TransportFactory {
    /**
     * http use axios
     * @param config
     * @returns
     */
    static createHttpClient(config?: AxiosRequestConfig): AxiosInstance;
    static createTcpClient(): void;
}
