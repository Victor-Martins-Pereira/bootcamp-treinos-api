import "dotenv/config";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import Fastify from "fastify";
import z from "zod";

const app = Fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "BootCamp Api treinos",
      description: "API para o bootcamp de treinos",
      version: "1.0.0",
    },
    servers: [
      {
        description: "Localhost",
        url: "https://localhost:3000",
      },
    ],
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// app.get("/", async function handler() {
//   return { hello: "world" };
// });

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  schema: {
    description: "Hello world",
    tags: ["hello wolrd"],
    response: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  handler: () => {
    return {
      message: "teste",
    };
  },
});

try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  app.log.error(err);
  process.exit(1);
}
