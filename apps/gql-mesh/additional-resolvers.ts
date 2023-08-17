import * as deepl from "deepl-node";

const resolvers = {
  Mutation: {
    async TRANSLATION_translation_TRANSLATION_translation(
      root,
      args,
      context,
      info
    ) {

      const authKey = process.env.DEEPL_ACCESS_TOKEN;
      const translator = new deepl.Translator(authKey);
      const sourceLang = args?.input?.source_lang.toLowerCase();
      const targetLang = args?.input?.target_lang.toLowerCase();

      return await translator.translateText(
        args?.input?.text,
        sourceLang,
        targetLang
      );
    },
  },
};

module.exports = { resolvers };
