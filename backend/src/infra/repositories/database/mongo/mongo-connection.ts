import {
  MongoClient,
  Db as MongoDb,
  Collection,
  ServerApiVersion,
} from 'mongodb';

import { ILogger } from '../../../log/interfaces';
import { ILoggerConfig } from '../../../log/logging.config';

export class MongoConnection {
  private mongoClient: MongoClient;
  private db: MongoDb;
  private _collections: Record<string, Collection> = {};
  private readonly logger: ILogger;

  constructor(
    loggerConfig: ILoggerConfig,
    private readonly dbName: string,
    private readonly collectionsName: string[],
  ) {
    this.logger = loggerConfig.logger(MongoConnection.name);
  }

  async connect(uri: string) {
    try {
      this.logger.info('Starting connection to MongoDB');

      this.mongoClient = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      this.logger.info('Connecting to MongoDB Atlas cluster...');
      await this.mongoClient.connect();
      this.db = this.mongoClient.db(this.dbName);
      await this.db.command({ ping: 1 });

      this.logger.info('Successfully connected to MongoDB Atlas!');
      this.logger.info('Getting collections');

      for (const collection of this.collectionsName) {
        this._collections[collection] = this.db.collection(collection);
      }

      this.logger.info('Collections retrieved');
    } catch (error) {
      this.logger.error(
        error,
        error?.stack,
        'Connection to MongoDB Atlas failed!',
      );
      process.exit(1);
    }
  }

  getCollection(name: string) {
    return this._collections[name];
  }

  async disconnect() {
    await this.mongoClient.close(true);
    this.logger.info('Mongo Connection Closed');
  }
}
