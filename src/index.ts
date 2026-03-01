import "dotenv/config";
import {
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
