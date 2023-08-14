export const translate = (text, locale) => {
  return `
    I want you to behave like a translator. I will send you text in english and please reply me just with translated text. The shortcutted name of a language I want you to print me is ${locale} and the text to translate is below: 
    ${text}
    `;
};
