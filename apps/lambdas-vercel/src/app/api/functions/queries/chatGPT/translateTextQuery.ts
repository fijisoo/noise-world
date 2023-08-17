export const translateTextQuery = (text, locale) => {
  return `
  mutation GetTranslation {
    TRANSLATION_translation_TRANSLATION_translation(input: {
        text: ${text},
        target_lang: "${locale}",
        source_lang: "en"
      }){
        text
        detectedSourceLang
      }
    }
    `;
};
