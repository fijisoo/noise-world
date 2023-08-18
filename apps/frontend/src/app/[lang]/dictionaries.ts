import { i18n } from "../../../i18n-config";

const dictionaries = () => {
  const supportedLanguages = i18n.locales;
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
