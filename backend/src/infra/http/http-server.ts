import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import FastifyMiddie from '@fastify/middie';
import cors from '@fastify/cors';
import { IncomingMessage } from 'node:http';

import { IEnvService } from '../../config/env.service';
import { ILogger } from '../../infra/log/interfaces';
import { ILoggerConfig } from '../log/logging.config';

import {
  EnrichedRequest,
  EnrichedResponse,
  IController,
  IServerHTTP,
} from '../../@interfaces/http';

export class HTTPServer implements IServerHTTP {
  private readonly logger: ILogger;
  private readonly server: FastifyInstance;
  private readonly controllers: IController[] = [];

  constructor(
    private readonly env: IEnvService,
    private readonly loggerConfig: ILoggerConfig,
  ) {
    this.logger = this.loggerConfig.logger(HTTPServer.name);
    this.server = Fastify({
      logger: {
        stream: loggerConfig.providerConfig.streamingLogger,
      },

      requestIdHeader: 'X-Request-Id',
    });
  }

  private get PORT() {
    return +this.env.get('API_PORT');
  }

  private async setMiddlewares() {
    await this.server.register(FastifyMiddie, { hook: 'onRequest' });
    await this.server.register(cors);

    this.server.use((req: IncomingMessage, res, next) => {
      res.setHeader('X-Request-Id', req.id.toString());
      next();
    });
  }

  private async setRoutes() {
    this.controllers.forEach((controller) => {
      const routes = controller.mappedRoutes;
      for (const route in routes) {
        const method = routes[route].method.toLocaleLowerCase();
        const handler = routes[route].handler;

        async function mappedHandler(req: FastifyRequest, res: FastifyReply) {
          const enrichedReq: EnrichedRequest = {
            body: req.body as object | undefined | null,
            params: req.params as object,
            query: req.query as object,
          };

          const enrichedRes: EnrichedResponse = {
            setStatusCode: (code: number) => res.code(code),
            send: (payload: unknown) => res.send(payload),
            addHeader: (key: string, value: string) => res.header(key, value),
          };

          await handler(enrichedReq, enrichedRes);
        }

        this.server[method](route, mappedHandler);
        this.logger.info(`Rota ${method} ${route} adicionada`);
      }
    });
  }

  public addController(controller: IController): IServerHTTP {
    this.controllers.push(controller);
    return this;
  }

  public async start() {
    await this.setMiddlewares();
    await this.setRoutes();

    await this.server.listen({ port: this.PORT });
  }

  public async stop(): Promise<void> {
    await this.server.close();
    this.logger.info('Server stopped');
  }
}
