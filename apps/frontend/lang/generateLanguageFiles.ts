// const fetch = require("node-fetch");
// const fs = require("fs");
//
// const fetchTranslations = async () => {
//   const response = await fetch("");
//   const data = await response.json();
//   return data;
// };
//
// const generateLanguageFiles = async () => {
//   const translations = await fetchTranslations();
//   const supportedLanguages = [
//     "en",
//     "de",
//     "pl",
//     "ar",
//     "it",
//     "zh",
//     "ja",
//     "vi",
//     "fr",
//     "es",
//     "tr",
//   ];
//   supportedLanguages.forEach((locale) => {
//     const translationsForLocale = translations[locale];
//     const filePath = `./lang/${locale}.json`;
//     fs.writeFileSync(filePath, JSON.stringify(translationsForLocale, null, 2));
//   });
// };
//
// generateLanguageFiles();
