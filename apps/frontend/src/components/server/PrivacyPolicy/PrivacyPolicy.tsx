"use client";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

export const PrivacyPolicy = () => {
  const privacyPolicy = {
    "Privacy Policy": {
      "Last Updated": "08.09.2023",
      "1. Introduction":
        'This Privacy Policy outlines the principles of data collection, processing, and protection of personal information of users of our application ("syncArt"). Please review the contents of this Privacy Policy before using syncArt.',
      "2. Information We Collect":
        "While using syncArt, we may collect the following types of personal information:\n\n- **Identifying Information:** e.g., name, last name, email address.\n- **Contact Information:** e.g., residential address, phone number.\n- **Technical Information:** e.g., IP address, device information, web browser.",
      "3. Purpose and Methods of Data Processing":
        "The collected personal data is processed for the following purposes:\n\n- Providing services available within syncArt.\n- Handling user inquiries and requests.\n- Enhancing syncArt and customizing it to users' needs.\n- Sending marketing communications (with user consent).",
      "4. Sharing Personal Data":
        "Users' personal data may be shared with the following entities:\n\n- Service providers who assist us in providing services.\n- Law enforcement agencies in accordance with applicable law.\n- Other App users (e.g., for social features).",
      "5. Data Protection":
        "We take measures to ensure the security of users' personal data and implement appropriate technical and organizational safeguards for its protection.",
      "6. Your Rights":
        "Users have the following rights:\n\n- Access to their personal data.\n- Rectification of their personal data.\n- Erasure of their personal data.\n- Withdrawal of consent for data processing.",
      "7. Contact":
        "For any questions regarding this Privacy Policy or the processing of personal data, please contact us at contact@sync.art.",
    },
  };

  function jsonToMarkdown(data: any) {
    let markdown = "";
    for (const section in data["Privacy Policy"]) {
      markdown += `# ${section}\n\n`;
      markdown += `${data["Privacy Policy"][section]}\n\n`;
    }
    return markdown;
  }

  const markdownData = jsonToMarkdown(privacyPolicy);

  return (
    <div className="flex rounded-md border-2 bg-brandWhite p-4">
      <div className="markdown-body flex flex-col">
        <ReactMarkdown>{markdownData}</ReactMarkdown>
      </div>
    </div>
  );
};
