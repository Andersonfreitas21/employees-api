import {
  EnrichedRequest,
  EnrichedResponse,
  IController,
  MappedRouters,
} from '../../../@interfaces/http';
import { ILogger } from '../../log/interfaces';
import { IConsultInvoiceService } from '../../../use-case/invoice/consult-invoice.service';
import { IConsultXMLService } from '../../../use-case/invoice/consult-xml.service';
import { ILoggerConfig } from '../../log/logging.config';

export class InvoiceController implements IController {
  private readonly logger: ILogger;

  constructor(
    loggerConfig: ILoggerConfig,
    private readonly xmlService: IConsultXMLService,
    private readonly consultInvoiceService: IConsultInvoiceService,
  ) {
    this.logger = loggerConfig.logger(InvoiceController.name);
  }

  public get mappedRoutes(): MappedRouters {
    return {
      '/api/v1/consultar/xml': {
        method: 'GET',
        handler: this.consultXML.bind(this),
      },

      '/api/v1/consultar': {
        method: 'GET',
        handler: this.consult.bind(this),
      },
    };
  }

  async consultXML(req: EnrichedRequest, res: EnrichedResponse) {
    const query = req.query as { integrationId?: string };
    const integrationId = query?.integrationId;
    if (!integrationId) {
      res.setStatusCode(400);
      return res.send({
        message: 'Parâmetro integrationId é obrigatório',
      });
    }

    this.logger.info(
      `Iniciando consulta de XML de nota fiscais ${integrationId}`,
    );

    try {
      const { content, filename } = await this.xmlService.getXMLByIntId(
        integrationId,
      );

      res.addHeader('Content-Type', 'application/xml');
      res.addHeader('Content-Disposition', `attachment; filename=${filename}`);
      return res.send(content);
    } catch (error) {
      this.logger.error(
        `Erro ao consultar XML da nota fiscal ${integrationId}`,
        error,
      );

      res.setStatusCode(500);
      res.send({ message: 'Erro ao consultar XML da nota fiscal', error });
    }
  }

  async consult(req: EnrichedRequest, res: EnrichedResponse) {
    const query = req.query as { integrationId?: string };
    const integrationId = query?.integrationId;
    const invalidParams = !integrationId;
    if (invalidParams) {
      res.setStatusCode(400);
      return res.send({
        message: 'Parâmetro integrationId é obrigatório',
      });
    }

    this.logger.info(
      `Iniciando rota de consulta de notas fiscais ${integrationId}`,
    );

    const invoice = await this.consultInvoiceService.execute({
      intId: integrationId,
    });

    if (invoice.hasError) {
      this.logger.error(invoice.message, invoice.stackError);
      return res.send({
        message: 'Erro ao consultar nota fiscal',
        error: true,
      });
    }

    res.send(invoice.data);
  }
}
