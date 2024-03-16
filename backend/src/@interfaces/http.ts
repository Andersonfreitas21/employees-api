import { ServerResponse } from 'node:http';
import { IncomingMessage } from 'node:http';

export type EnrichedRequest = Partial<IncomingMessage> & {
  params: object;
  body: object | undefined | null;
  query: object;
};

export type EnrichedResponse = Partial<ServerResponse<IncomingMessage>> & {
  send: (payload: unknown) => void;
  setStatusCode: (code: number) => void;
  addHeader: (key: string, value: string) => void;
};

export type MappedRouters = {
  [router: string]: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    handler: (req: EnrichedRequest, res: EnrichedResponse) => Promise<void>;
  };
};

export interface IController {
  get mappedRoutes(): MappedRouters;
}

export interface IServerHTTP {
  start(): Promise<void>;
  stop(): Promise<void>;
  addController(controller: IController): IServerHTTP;
}
