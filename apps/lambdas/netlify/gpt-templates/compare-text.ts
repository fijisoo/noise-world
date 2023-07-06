export const compareTextPrompt = (oldText, newText) => `
This prompt is separated to two sections. First section is instruction what we want to archive, and second part is content on which we want to process the instructions. First section is tagged by "#FIRST SECTION" and ends with the beginning on second section which is tagged "#SECOND SECTION". Those two words are unique for this whole question so be careful.

#FIRST SECTION
I would like to write blog article. The blog is about changes and more precise about changes in business paths, infrastucture, growth, visions about music industry. I would like to write this article by comparing texts. I have a two texts which are about the same content but in two different versions. The text is about documentation about project. It's technical documentation or should be more technical than any other blog text. The article should be readable by any nontechnical person and any nontechnical person should understand what exactly changed. The description should be about content so the business aspect not about meta data changes.   
MAKE IT PRODUCTION READY. WRITE IT WITH MARKDOWN TAGS. MAX WORDS FOR WHOLE ARTICLE: 100. SEPARATE TITLE TO THE REST OF ARTICLE WITH "@@@@". DO NOT FORMAT THE TEXT.

So the template would be:

*TITLE_OF_ARTICLE*
@@@@
*REST_ARTICLE*

#SECOND SECTION
Text 1 below:
${oldText.toString()}

Text 2 below: 
${newText.toString()}
`