'use strict';

module.exports = ({ strapi }) => ({
  async generate(ctx) {
    ctx.body = await strapi
      .plugin('ai-text-generation-description')
      .service('openAi')
      .generateText(ctx.request.body.prompt);
  },
});
