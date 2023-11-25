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
Product name: Iphone 15
Description: The iPhone 15 is a model of the iPhone series that was released in September 2023 1. It features a 6.1-inch Super Retina XDR display with up to 2000 nits of brightness and Dynamic Island 1. The phone has a USB-C port for charging and data transfer 2. The iPhone 15 comes with a 48MP main camera that can click 2x zoom shots 2. The phone is available in 128GB, 256GB, and 512GB storage capacities 1. It is powered by the A16 Bionic chip with a 6-core CPU and a 5-core GPU 1. The phone is equipped with an advanced dual-camera system that includes a 48MP main camera, a 12MP ultra-wide camera, and a 12MP 2x telephoto camera 1. The phone is splash, water, and dust resistant with an IP68 rating 1.
Price is: 999$.
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
    const extractContent = assistantMessage.content;

    return { content, data: extractContent, messages };
}
