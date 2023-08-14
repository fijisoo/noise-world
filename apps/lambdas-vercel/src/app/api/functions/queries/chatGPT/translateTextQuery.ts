import { translate } from "./gpt-templates/translate";

export const translateTextQuery = (text, locale) => {
    const GPT_Translate_Prompt = JSON.stringify(translate(text, locale).trim());
    return `
        mutation GPT_MUTATION {
        chat_GPT_post_chat_completions(
          input: {model: "gpt-3.5-turbo-0301", messages: {role: "user", content: ${GPT_Translate_Prompt}}}
        ) {
          ... on chat_GPT_ChatCompletionResponse {
            id
            object
            created
            model
            choices {
              message {
                role
                content
              }
              finish_reason
              index
              logprobs
              text
            }
          }
        }
      }
    `;
};
