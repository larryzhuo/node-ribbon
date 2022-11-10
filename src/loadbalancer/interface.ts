//Server Info
export interface Server {
  ip: string;
  port: number;
  weight?: number;
  ephemeral?: boolean;
  clusterName?: string;
}

export interface ChooseServerOption {}
