'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'text-ai',
    plugin: 'ai-text-generation-description',
    type: 'string',
  });
};
