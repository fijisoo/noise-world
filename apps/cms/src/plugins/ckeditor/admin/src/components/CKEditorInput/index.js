import React, { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Stack } from "@strapi/design-system/Stack";
import {
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldAction,
} from "@strapi/design-system/Field";
import { Flex } from "@strapi/design-system/Flex";
import PropTypes from "prop-types";

import { getGlobalStyling } from "./GlobalStyling";
import Configurator from "./Configurator";
import MediaLib from "../MediaLib";
import { FeatherSquare } from "@strapi/icons";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { auth } from "@strapi/helper-plugin";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ckeditor5Dll from "ckeditor5/build/ckeditor5-dll.js";
import ckeditor5EditorClassicDll from "@ckeditor/ckeditor5-editor-classic/build/editor-classic.js";

import sanitize from "./utils/utils";

const CKEditorInput = ({
  attribute,
  onChange,
  name,
  value,
  disabled,
  labelAction,
  intlLabel,
  required,
  description,
  error,
}) => {
  const [editorInstance, setEditorInstance] = useState(false);
  const { formatMessage } = useIntl();
  const { maxLengthCharacters: maxLength, ...options } = attribute.options;
  const configurator = new Configurator({ options, maxLength });
  const editorConfig = configurator.getEditorConfig();

  const wordCounter = useRef(null);

  const strapiTheme = localStorage.getItem("STRAPI_THEME");
  const GlobalStyling = getGlobalStyling(strapiTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const context = useCMEditViewDataManager();

  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleChangeAssets = (assets) => {
    let imageHtmlString = "";

    assets.map((asset) => {
      if (asset.mime.includes("image")) {
        const url = sanitize(asset.url);
        const alt = sanitize(asset.alt);

        imageHtmlString += `<img src="${url}" alt="${alt}" />`;
      }
    });

    const viewFragment = editorInstance.data.processor.toView(imageHtmlString);
    const modelFragment = editorInstance.data.toModel(viewFragment);
    editorInstance.model.insertContent(modelFragment);

    handleToggleMediaLib();
  };

  const postTextPrompt = (postName) =>
    `I only want you to answer in English. I want you to act as a very competent SEO and senior copywriter who speaks and writes fluent English. Project description is put between '"""' marks at the beginning of the prompt. Article will also have a short paragraph (max 150 words) about project vision (syncArt). You should definitely use Html tags when creating headings, that is, the main title should be created with h1 and subheadings with h2, h3, h4 html tags. Write the text as long as possible, at least 1000 words. I want you to claim that you can write English content so well that you can leave other websites behind. Don't forget that you should definitely use html tags when creating headings. Follow the instructions: Headings as <h1></h1> <h2></h2> <h3></h3>, paragraphs as <p></p> lists as <ul></ul> or <ol></ol>, bold as <bold></bold>, italic as <i></i>, blockquotes as <blockquote></blockquote>, links as <a></a>. Don't tell me that there are many factors that affect good search rankings. I know that content quality is just one of them and here it is your job to write the best quality content possible, not to lecture me about general SEO rules. I give you the title "${postName}" of an article that we need to rank high in Google. Then I ask you to write an article in an official "biz form" that will help me rank the article I gave you high in Google. Article will also have a short paragraph (max 150 words) about project vision (syncArt). The context of the description should be presented as it is for a 3rd person like somebody can understand what it is about. Write a long, fully HTML tag formatted article in English that can rank in Google for the same keywords as this website. The article should be rich and comprehensive, with very detailed paragraphs, with a lot of detail. Do not repeat my request. Make it a long article of 1000 words. Do not remind me what I asked you for. Do not apologize. Don't refer to yourself. Don't use generic filler sentences anymore. Use useful subheadings with keyword-rich titles. Get to the point fully and accurately. Don't explain what happened and why, just give me your best possible article. All outputs will be in English. Write the article as long as possible, at least 1000 words. Make the headings <bold></bold> and follow the <h></h> tags. You should definitely use HTML when creating headings, that is, the main title should be created with <h1></h1> and subheadings with <h2></h2>, <h3><h3/>, <h4></h4>. `;

  const generateText = async () => {
    setIsLoading(true);
    if (!context.modifiedData?.description || !context.modifiedData?.title) {
      window.alert(
        "u didnt provide description or title, please provide description AND title first"
      );
      return null;
    }

    try {
      const response = await fetch(`/ckeditor/generate-text`, {
        method: "POST",

        body: JSON.stringify({
          prompt: `Please ignore the previous instructions. Project description: """${
            context.modifiedData.description
          }""". ${postTextPrompt(context.modifiedData.title)}`,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const parsedResult = result.choices[0].text;

      onChange({ target: { name, value: parsedResult } });
      setIsLoading(false);
    } catch (err) {
      setErr(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Field
      name={name}
      id={name}
      // GenericInput calls formatMessage and returns a string for the error
      error={error || err}
      hint={description && formatMessage(description)}
    >
      <Stack spacing={1}>
        <Flex
          direction="row"
          justifyContent="space-between"
          marginBottom="3px"
          position="relative"
          width="100%"
        >
          <FieldLabel action={labelAction} required={required}>
            {formatMessage(intlLabel)}
          </FieldLabel>
          <FieldAction
            onClick={() => {
              console.log("clickeddd");
              return generateText();
            }}
            label={`auto generate content`}
          >
            <FeatherSquare />
          </FieldAction>
        </Flex>
        <GlobalStyling />
        <CKEditor
          editor={window.CKEditor5.editorClassic.ClassicEditor}
          disabled={disabled}
          data={value}
          onReady={(editor) => {
            const wordCountPlugin = editor.plugins.get("WordCount");
            const wordCountWrapper = wordCounter.current;
            wordCountWrapper.appendChild(wordCountPlugin.wordCountContainer);

            const mediaLibPlugin = editor.plugins.get("strapiMediaLib");
            mediaLibPlugin.connect(handleToggleMediaLib);

            setEditorInstance(editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            console.log("data", data);
            onChange({ target: { name, value: data } });

            const wordCountPlugin = editor.plugins.get("WordCount");
            const numberOfCharacters = wordCountPlugin.characters;

            if (numberOfCharacters > maxLength) {
              console.log("Too long");
            }
          }}
          config={editorConfig}
        />
        <div ref={wordCounter}></div>
        <FieldHint />
        <FieldError />
      </Stack>
      <MediaLib
        isOpen={mediaLibVisible}
        onChange={handleChangeAssets}
        onToggle={handleToggleMediaLib}
      />
    </Field>
  );
};

CKEditorInput.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: "",
};

CKEditorInput.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default CKEditorInput;
