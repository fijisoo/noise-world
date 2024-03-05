import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";
import {
  Textarea,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
import { auth } from "@strapi/helper-plugin";
import { parseMarkdown } from "./markdownParser";

export default function Index({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  attribute,
}) {
  const { formatMessage } = useIntl();
  const [prompt, setPrompt] = useState("");
  const [promptOpt, setPromptOpt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  //To operate the application, I assume the following will be needed: servers for the frontend and backend, GraphQL Mesh, databases, code to create the application/system architecture, coding tools, network monitoring tools, testing tools, and SEO tools. Additionally, smart contracts will need to be written, and research will be required to determine which blockchains and tools to use for the most optimal NFT minting. Prototyping tools and graphic design tools will need to be purchased. Documentation will need to be prepared, social media accounts will need to be created, and marketing and advertising efforts will be necessary. Testers and application ambassadors will need to be hired to ensure the application functions correctly and to assess it from their perspective. An audit will also be conducted. Research into new technologies, particularly in the blockchain and security fields, will be ongoing. Administrative tasks such as accounting and office management will need to be addressed, and customer support personnel may need to be hired or an AI solution implemented in case users encounter issues with the application.

  const projectDescription = `
My application is a web application designed for artists and their fans, but it also envisions use by third parties for their business purposes. It will operate on mobile devices, tablets, and laptops. To function properly, it will require communication with a cryptocurrency wallet. The mobile application will allow QR code scanning and redirect users to the appropriate page for minting NFTs. The main functionality of the application will include creating NFT collections and the ability to mint NFTs. Additionally, users will be able to create NFT bundles where one NFT will contain others, allowing, for example, a musician to provide people who attended their concert with access to one of their debut songs, share their concert poster, and offer access to an incredible gallery of their past performances through the app.
Another feature is that not everyone will have the ability to mint NFTs, only those with a unique 'redeem code.' The collection creator can decide to make the collection available to third parties, but in that case, the collection won't be distributed 'for free' but will require a fee for access. This gives the creator the opportunity to promote the collection by giving away part of it for free and releasing the rest at a specified price. Importantly, the creator can restrict access to NFTs so that only whitelisted individuals can access the NFT content.
Another interesting feature of the application is that the creator can generate unique QR codes with 'redeem codes,' which can be placed on physical goods and given to consumers as a 'gift' with their physical purchase. The QR code service will be an additional paid feature. Another promotion option will be the ability to use a unique link that allows embedding special functionality on social media. This will work by sharing a unique link on platforms like Twitter, which will display an image with a QR code and NFT/collection information from the shared link. People who scan the QR code will have the opportunity to share their 'post' on Twitter or other social media platforms, and upon sharing, they will receive information about whether they have been whitelisted or have the ability to mint NFTs/collections from the link.`;

  const postTextPrompt = (postName) =>
    `I only want you to answer in English. I want you to act as a very competent SEO and senior copywriter who speaks and writes fluent English. Project description is put between '"""' marks at the beginning of the prompt. Article will also have a short paragraph (max 150 words) about project vision (syncArt). You should definitely use Markdown language when creating headings, that is, the main title should be created with h1 and subheadings with h2, h3, h4. Write the text as long as possible, at least 1000 words. When preparing the article, use https://contgpt.com  and bold the necessary words. I want you to claim that you can write English content so well that you can leave other websites behind. Don't forget that you should definitely use markdown language when creating headings, i.e. the main title should be h1 and subheadings should be h2, h3, h4.  Don't tell me that there are many factors that affect good search rankings. I know that content quality is just one of them and here it is your job to write the best quality content possible, not to lecture me about general SEO rules. I give you the title "${postName}" of an article that we need to rank high in Google. Then I ask you to write an article in an official "biz form" that will help me rank the article I gave you high in Google. Article will also have a short paragraph (max 150 words) about project vision (syncArt). The context of the description should be presented as it is for a 3rd person like somebody can understand what it is about. Write a long, fully markdown-formatted article in English that can rank in Google for the same keywords as this website. The article should be rich and comprehensive, with very detailed paragraphs, with a lot of detail. Do not repeat my request. Make it a long article of 1000 words. Do not remind me what I asked you for. Do not apologize. Don't refer to yourself. Don't use generic filler sentences anymore. Use useful subheadings with keyword-rich titles. Get to the point fully and accurately. Don't explain what happened and why, just give me your best possible article. All outputs will be in English. Write the article as long as possible, at least 1000 words. Make the headings bold and follow the h tags. You should definitely use Markdown language when creating headings, that is, the main title should be created with h1 and subheadings with h2, h3, h4. `;

  const descriptionPrmt = (
    blogPost
  ) => `Please ignore the previous instructions. I only want you to answer in English. Write description for blog post which I post below. Description should be max 300 characters long. Blog post:
  """${blogPost}"""`;

  const keyWordsPrmt = (
    blogPost
  ) => `Please ignore the previous instructions. I only want you to answer in English. Write 7 keywords for provided blog post which is posted below:
  """${blogPost}"""`;

  const blogPostTextPrompt = (prmt) =>
    `Please ignore the previous instructions. Project description: """${projectDescription}""". ${postTextPrompt(
      prmt
    )}`;

  const descriptionPrompt = (prmt) => `${descriptionPrmt(prmt)}`;
  const keyWordsPrompt = (prmt) => `${keyWordsPrmt(prmt)}`;

  const generatePromptBasedOnOpt = (opt, prmt) => {
    if (opt === "blogPost") {
      console.log(blogPostTextPrompt(prmt));
      return blogPostTextPrompt(prmt);
    }
    if (opt === "description") {
      return descriptionPrompt(prmt);
    }
    if (opt === "keyWords") {
      return keyWordsPrompt(prmt);
    }
  };

  const generateText = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/ai-text-generation/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt: `${generatePromptBasedOnOpt(promptOpt, prompt)}`,
          temperature: 0.4,
          max_tokens: 2500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const parsedResult = result.choices[0].text;

      onChange({ target: { name, value: parsedResult, type: attribute.type } });
      setIsLoading(false);
    } catch (err) {
      setErr(err.message);
      setIsLoading(false);
    }
  };

  const clearGeneratedText = async () => {
    onChange({ target: { name, value: "", type: attribute.type } });
  };

  return (
    <Stack padding={4} spacing={2}>
      <SingleSelect
        label="Fruits"
        placeholder="My favourite fruit is..."
        onClear={() => {
          setPromptOpt(undefined);
        }}
        value={promptOpt}
        onChange={setPromptOpt}
      >
        <SingleSelectOption value="blogPost">Blog Post</SingleSelectOption>
        <SingleSelectOption value="description">Description</SingleSelectOption>
        <SingleSelectOption value="keyWords">Key words</SingleSelectOption>
      </SingleSelect>
      <Textarea
        placeholder="Please write a prompt for content to generate"
        label="Prompt"
        name="Prompt"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <Stack spacing={4}>
        <div placeholder="Generated text" label="Content" name="content">
          <div dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }} />
        </div>
        <Stack horizontal spacing={4}>
          <Button onClick={() => generateText()}>
            {isLoading ? "Loading..." : "Generate"}
          </Button>
          <Button onClick={() => clearGeneratedText()}>Clear</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
