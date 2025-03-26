import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  /**
   *   get the express instance from the Nest application
   * this is important for serverless-express to work
   * because serverless-express needs the express instance to handle requests
   * and the Nest application is built on top of express
   * so we need to get the express instance from the Nest application
   * and pass it to serverless-express
   */
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({
    app: expressApp,
  });
}

/**
 * This is the main handler function that will be called by AWS Lambda
 * when the function is invoked
 * If the server is not cached, it will create a new server instance
 * and cache it for future invocations
 * If the server is cached, it will reuse the cached server instance
 * by calling the cached server instance with the event, context and callback
 */
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
): Promise<any> => {
  /**
   * Check if the server is already cached and reuse it if possible
   * This is important for performance and to avoid cold starts in AWS Lambda
   * cold start is when the function is invoked for the first time or after a period of inactivity
   * and the server needs to be initialized again
   * This can be avoided by caching the server instance
   * and reusing it for subsequent invocations
   */
  cachedServer = cachedServer ?? (await bootstrap());
  return cachedServer(event, context, callback);
};
