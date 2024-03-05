import React, { useState } from "react";
import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  FieldInput,
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
    if (!context.modifiedData?.content) {
      window.alert("u didnt provide content, please provide content first");
    }
    try {
      const response = await fetch(
        `/ai-text-generation-keywords/generate-text`,
        {
          method: "POST",
          body: JSON.stringify({
            prompt: `Please ignore the previous instructions. I only want you to answer in English. Write 7 keywords for provided blog post which is posted below:
  """${context.modifiedData?.content}"""`,
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
      <Flex direction="column" width="100%" alignItems="flex-start" gap={1}>
        <FieldLabel>Generate keywords</FieldLabel>
        <FieldInput
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          endAction={
            <FieldAction
              onClick={() => generateText()}
              label={`auto generate content`}
            >
              <FeatherSquare />
            </FieldAction>
          }
        />
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
});
