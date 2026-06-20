export const postOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        someKey: { type: "string" },
        someOtherKey: { type: "number" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },
} as const;
