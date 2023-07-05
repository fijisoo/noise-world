import { compareTextPrompt } from "../../gpt-templates/compare-text";

export const createManifestoDiffArticleQuery = (oldText, newText) => {

    const GPT_question = compareTextPrompt(oldText, newText);

    return `
        mutation GPT_MUTATION {
        chat_GPT_post_chat_completions(
          input: {model: "gpt-3.5-turbo-0301", messages: {role: "user", content: "${GPT_question}"}}
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
