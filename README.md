# NestJS Serverless Application

This project is a NestJS application configured to run on AWS Lambda using the Serverless Framework. It demonstrates how to deploy a NestJS application as a serverless function.

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI (`npm install -g serverless`)

## Installation

```bash
# Install dependencies
npm install
```

## Local Development

```bash
# Build the application
npm run build

# Run locally using serverless-offline
npx serverless offline
```

The application will be available at `http://localhost:3000`.

## Environment Variables

Environment variables are configured through `.env` files:

- `.env` - Used for local development
- `.env.prod` - Used for production deployment

The main environment variables used are:

- `PORT` - Port number for local server (default: 3002)

## API Endpoints

- `GET /hello-world/greet` - Returns a greeting message

## Deployment

```bash
# Build the application before deployment
npm run build

# Deploy to AWS Lambda (production stage)
npx serverless deploy --stage prod

# View logs from the deployed function
npx serverless logs --function main --stage prod

# Remove the deployed function
npx serverless remove --stage prod
```

## Project Structure

- `src/` - Source code directory
  - `app.controller.ts` - Main controller with route handlers
  - `app.service.ts` - Business logic
  - `app.module.ts` - NestJS module configuration
  - `main.ts` - Entry point for local development
  - `serverless.ts` - Lambda handler for serverless deployment

## Useful Links

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference)
- [NestJS Documentation](https://docs.nestjs.com/)

## License

[MIT](LICENSE)