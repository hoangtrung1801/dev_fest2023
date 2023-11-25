import openai from "@/app/libs/openai/chatConfig";
import { ChatCompletionRequestMessage } from "openai";

const systemMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a expert in SEO writing.",
};

const seoContentUserMessage = (
    title,
    description,
    price
): ChatCompletionRequestMessage => ({
    role: "user",
    content: `
I want to write a SEO content for a landing page to advertise the product. I will give you a product name, description, price.
Product name: ${title}
Description: ${description}
Price is: ${price}
Your answer should have 3 sections, which are one for hero block, one for feature block, one for contact block.
1. Hero block will include title, sub title
2. Feature block will include title, sub title, description, features. The features will include some key note about the feature of product.
3. Contact block will include title, sub title
    `,
});

const extractSeoContentMessage: ChatCompletionRequestMessage = {
    role: "user",
    content: `
Extract your answer into array of 3 objects, which are one for hero block, one for feature block, one for contact block. The output should just has data of array, not anymore
[
{
id: 'hero'
<hero content>
},
{
id: 'feature',
<feature content>
},
{
id: 'contact',
<contact content>
}
]
    `,
};

export async function generateSeoContent(title, description, price) {
    try {
        let messages = [
            systemMessage,
            seoContentUserMessage(title, description, price),
        ];

        const seoContentCompletion = await openai.createChatCompletion({
            model: "gpt-4-0613",
            temperature: 1,
            top_p: 1,
            max_tokens: 4069,
            messages,
        });

        let assistantMessage = seoContentCompletion.data.choices[0].message;
        const content = assistantMessage.content;

        messages.push(extractSeoContentMessage);
        const extractSeoContentCompletion = await openai.createChatCompletion({
            model: "gpt-4-0613",
            temperature: 1,
            top_p: 1,
            max_tokens: 4069,
            messages,
        });
        assistantMessage = extractSeoContentCompletion.data.choices[0].message;
        const extractContent = JSON.parse(assistantMessage.content);

        return { content, data: extractContent, messages };
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}
