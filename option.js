const options = {
  exposeRoute: true,
  openapi: {
    info: {
      title: "Test swagger",
      description: "testing the fastify swagger api",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost",
      },
    ],
    tags: [{ name: "tag" }],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
    externalDocs: {
      description: "Find more info here",
      url: "https://swagger.io",
    },
  },
};

const fullSwaggerUi = {
  ...options,
  openapi: {
    ...options.openapi,
    components: {
      ...options.openapi.components,
      parameters: {
        someHeader: {
          in: "header",
          name: "someHeader",
          type: "string",
          enum: ["value1", "value2"],
        },
      },
    },
  },
};

const validOpenapi = {
  ...options,
  openapi: {
    ...options.openapi,
    components: {
      ...options.openapi.components,
      parameters: {
        someHeader: {
          in: "header",
          name: "someHeader",
          schema: {
            type: "string",
            enum: ["value1", "value2"],
          },
        },
      },
    },
  },
};

module.exports = { fullSwaggerUi, validOpenapi };
