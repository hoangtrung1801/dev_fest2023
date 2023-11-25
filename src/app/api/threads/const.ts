import { ThreadMessage, ThreadMessageType } from "@prisma/client";

export const question0: ThreadMessage = {
    id: "question0",
    type: ThreadMessageType.TEXT,
    content:
        "Hello, I'm a bot. I'm here to help you sell your product. What would you like to sell?",
};

export const question1: ThreadMessage = {
    id: "question1",
    type: ThreadMessageType.QUESTION,
    content: "What your product name?",
};

export const question2: ThreadMessage = {
    id: "question2",
    type: ThreadMessageType.QUESTION,
    content: "Description of product?",
};

export const question3: ThreadMessage = {
    id: "question3",
    type: ThreadMessageType.QUESTION,
    content: "What is the price?",
};

// export const question4: ThreadMessage = {
//     id: "question3",
//     type: ThreadMessageType.QUESTION,
//     content: "What is the price?",
// };
