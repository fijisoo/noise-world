import * as deepl from "deepl-node";

const resolvers = {
  Mutation: {
    async TRANSLATION_translation_TRANSLATION_translation(
      root,
      args,
      context,
      info
    ) {
      console.log(
        args?.input?.text,
        args?.input?.source_lang,
        args?.input?.target_lang
      );

      const authKey = process.env.DEEPL_ACCESS_TOKEN;
      const translator = new deepl.Translator(authKey);
      const sourceLang = args?.input?.source_lang.toLowerCase();
      const targetLang = args?.input?.target_lang.toLowerCase();

      const result = await translator.translateText(
        args?.input?.text,
          sourceLang,
          targetLang
      );
      console.log(result);

      return result;
    },
  },
};

module.exports = { resolvers };
