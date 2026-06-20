# fastify-api-template

A batteries-included template for spinning up a [Fastify](https://fastify.dev) API in TypeScript.

> Click **Use this template** on GitHub to bootstrap a new repo.

## Features

- ⚡ **Fastify 5** with typed routes via [`json-schema-to-ts`](https://github.com/ThomasAribart/json-schema-to-ts)
- 🦀 **oxlint + oxfmt** for fast linting and formatting
- 📦 **rolldown** for production bundling
- ✅ **vitest** for testing
- 🪝 **husky + lint-staged** pre-commit hooks (lint, typecheck, test)
- 🐳 **Docker + Docker Compose** (app + Postgres)
- 🔁 **GitHub Actions** CI (lint, typecheck, test, build, docker)
- 🛑 Graceful shutdown + structured logging (pino)

## Project structure

```
src/
  app.ts            # builds the Fastify instance (testable, no listen)
  server.ts         # boots app.ts, wires logging + graceful shutdown
  config.ts         # env-driven config
  app.test.ts       # example test using app.inject
  routes/
    index.ts        # route definitions
    types.ts        # JSON schemas for typed request/response
```

## Getting started

```sh
cp .env.example .env
pnpm install
pnpm dev
```

Server runs at `http://localhost:3000`. Try `GET /health`.

## Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `pnpm dev`        | Run with hot reload             |
| `pnpm build`      | Bundle to `dist/` with rolldown |
| `pnpm start`      | Run the production build        |
| `pnpm lint`       | Lint + format check             |
| `pnpm lint:fix`   | Lint + format, applying fixes   |
| `pnpm typecheck`  | Typecheck (`tsc --noEmit`)      |
| `pnpm test`       | Run tests once                  |
| `pnpm test:watch` | Run tests in watch mode         |

## Docker

```sh
docker compose up --build
```

Brings up the API and a Postgres instance. Configure via `.env`.

## Adding a route

1. Define the JSON schema in `src/routes/types.ts`.
2. Register the handler in `src/routes/index.ts` using `app.withTypeProvider<JsonSchemaToTsProvider>()` for inferred types.

## License

ISC
