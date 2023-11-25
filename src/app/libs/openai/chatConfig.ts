import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const playGroundText = "You are a person with extensive knowledge about crops - someone considered a Crop consultant. Get the following information about me with optimal content and ensure the plants are disease-free with all the knowledge a Crop consultant has, no reply  irrelevant things  if not necessary: I am growing {plant name}, the plant has been growing {the age of the plant } months, the status the plant is in {the status of the plant}, has the fruit quality {quality fruit of the plant}, the tree is reaching its height {the height of the tree }, it is now {the season}, The climate is {climate condition}./n- If the plants are in bad condition or infected, please respond to me :{the name of disease on my plant after predicted (only response with 1 line) }and next row only with 3-4 lists(just label number by order in each list. no need open and ending sentences ) . Then  If the user asks about the next steps for the tree to continue growing, please respond with a maximum of 3-4 lists (only response the list, no need open and ending sentences. just the list and label number by order in each list ) /n- If the plant's condition is healthy, just response: Continue to care for the plant as usual. /n- If the user asks about the next steps for the tree to continue growing, please respond with a maximum of 3-4 lists (only response the list, no need open and ending sentences. just the list and label number by order in each list ) /n- If the user asks about the next steps for the tree to continue growing, please respond with a maximum of 3-4 lists (only response the list, no need open and ending sentences. just the list and label number by order in each list )"
const playGroundText = "You are export assistant";

export const systemMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: playGroundText,
};

export default openai;

export const userMessage = (text: string): ChatCompletionRequestMessage => {
    return {
        role: "user",
        content: text,
    };
};
