export default {
  "ai-text-generation": {
    enabled: true,
    config: {
      apiToken: process.env.OPEN_AI_API_TOKEN,
    },
    resolve: "./src/plugins/ai-text-generation",
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: process.env.STRAPI_PLAYGROUND === "true",
      depthLimit: 8,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: process.env.STRAPI_PLAYGROUND === "true",
      },
      federation: true,
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  ckeditor: {
    enabled: true,
    config: {
      plugin: {},
      editor: {
        removePlugins: [""],
      },
    },
  },
};
