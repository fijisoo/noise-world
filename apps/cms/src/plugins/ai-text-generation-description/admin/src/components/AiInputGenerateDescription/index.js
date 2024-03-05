import React, { useState } from "react";
import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Textarea,
  FieldAction,
  Flex,
} from "@strapi/design-system";
import { FeatherSquare } from "@strapi/icons";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";

import { auth } from "@strapi/helper-plugin";

export default React.forwardRef(function Index(props, ref) {
  const context = useCMEditViewDataManager();

  const { name, error, description, onChange, value, intlLabel, attribute } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const generateText = async () => {
    setIsLoading(true);
    if (!context.modifiedData?.title) {
      window.alert("u didnt provide title, please provide title first");
      return null;
    }

    try {
      const response = await fetch(
        `/ai-text-generation-description/generate-text`,
        {
          body: JSON.stringify({
            prompt: `Please ignore the previous instructions. I only want you to answer in English. Write description for the text I post below. Description should be max 300 characters long. Text:
  """${context.modifiedData.title}. ${
              !!context.modifiedData?.prompt
                ? `extended title: ${context.modifiedData.prompt}`
                : ``
            }"""`,
          }),
        }
      );

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

  const handleChange = (e) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  return (
    <Field name="password">
      <Flex
        direction="column"
        alignItems="flex-start"
        position="relative"
        width="100%"
        gap={1}
      >
        <FieldLabel>Generate Description</FieldLabel>
        <Field width="100%">
          <Textarea
            value={value}
            width="100%"
            onChange={(e) => handleChange(e)}
          />
        </Field>
        <Flex position="absolute" style={{ right: 0, top: 0 }}>
          <FieldAction
            onClick={() => generateText()}
            label={`auto generate content`}
          >
            <FeatherSquare />
          </FieldAction>
        </Flex>
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
});
