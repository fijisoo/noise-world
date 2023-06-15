export default {
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: process.env.STRAPI_PLAYGROUND === 'true',
      depthLimit: 8,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: process.env.STRAPI_PLAYGROUND === 'true',
      },
      federation: true,
    },
  }
};
