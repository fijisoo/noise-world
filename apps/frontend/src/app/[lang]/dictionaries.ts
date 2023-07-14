const dictionaries = () => {
  const supportedLanguages = [
    "en",
    "de",
    "pl",
    "ar",
    "it",
    "zh",
    "ja",
    "vi",
    "fr",
    "es",
    "tr",
  ];
  const newObj: any = {};

  supportedLanguages.forEach((lng: string) => {
    newObj[lng] = function () {
      return import(`../../../lang/dictionaries/${lng}.json`).then(
        (module) => module.default
      );
    };
  });

  return newObj;
};

export const getDictionary = async (locale: string) => {
  const dics = dictionaries();

  return dics[locale]();
};
