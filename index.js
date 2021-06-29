const Fastify = require("fastify");
const fastifySwagger = require("fastify-swagger");
const { validOpenapi, fullSwaggerUi } = require("./option");

const headerToReference = "someHeader";

main();

async function main() {
  const app = Fastify();

  app.addSchema({
    $id: `#/components/parameters/${headerToReference}`,
    type: "string",
    enum: ["value1", "value2"],
  });

  // the two differ in `components/parameters/someHeader` definition
  // validOpenapi passes full OA3 validation on editor.swagger.io
  //   app.register(fastifySwagger, validOpenapi);

  // while fullSwaggerUi displays a select field for the header,
  // but won't pass editor.swagger.io validation
  app.register(fastifySwagger, fullSwaggerUi);

  const opts = {
    schema: {
      headers: {
        type: "object",
        required: ["referencedHeader"],
        properties: {
          referencedHeader: {
            $ref: `#/components/parameters/${headerToReference}`,
          },
        },
      },
      body: {
        type: "object",
        required: ["hello"],
        properties: {
          hello: {
            type: "string",
          },
        },
      },
    },
  };

  app.post("/", opts, () => {});

  app.listen(3000);
  console.log("listening at 3000");
}
