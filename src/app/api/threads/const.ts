import { ThreadMessage, ThreadMessageType } from "@prisma/client";

export const question0: ThreadMessage = {
    id: "question0",
    type: ThreadMessageType.TEXT,
    content:
        "Hello, I'm a bot. I'm here to help you sell your product. What would you like to sell?",
    payload: {},
};

export const question1: ThreadMessage = {
    id: "question1",
    type: ThreadMessageType.QUESTION,
    content: "What your product name?",
    payload: {},
};

export const question2: ThreadMessage = {
    id: "question2",
    type: ThreadMessageType.QUESTION,
    content: "Description of product?",
    payload: {},
};

export const question3: ThreadMessage = {
    id: "question3",
    type: ThreadMessageType.QUESTION,
    content: "What is the price?",
    payload: {},
};

export const question4: ThreadMessage = {
    id: "question4",
    type: ThreadMessageType.QUESTION,
    content: "What style do you want for the page?",
    payload: {},
};

export const question5: ThreadMessage = {
    id: "question5",
    type: ThreadMessageType.QUESTION,
    content: "What color do you want for the page?",
    payload: {},
};

export const generateSeoContent: ThreadMessage = {
    id: "seocontent",
    type: ThreadMessageType.TEXT,
    content: "Generating SEO content...",
    payload: {},
};

export const questionConfirmSeoContent: ThreadMessage = {
    id: "seocontent",
    type: ThreadMessageType.TEXT,
    content: "Do you confirm this SEO content?",
    payload: {},
};

export const questionBlock6 = (seo?: any): ThreadMessage => ({
    id: "questionblock6",
    type: ThreadMessageType.QUESTION,
    content: "Choose your first block in landing page",
    payload: {
        blocks: [
            {
                id: "hero-1",
                props: {
                    title: seo?.find((x) => x.id === "hero").title,
                    subtitle: seo?.find((x) => x.id === "hero").subtitle,
                },
            },
            {
                id: "hero-2",
                props: {
                    title: seo?.find((x) => x.id === "hero").title,
                    subtitle: seo?.find((x) => x.id === "hero").subtitle,
                },
            },
        ],
    },
});

export const questionBlock7 = (seo?: any): ThreadMessage => ({
    id: "questionblock7",
    type: ThreadMessageType.QUESTION,
    content: "Choose your second block in landing page",
    payload: {
        blocks: [
            {
                id: "feature-1",
                props: {
                    title: seo?.find((x) => x.id === "feature").title,
                    subtitle: seo?.find((x) => x.id === "feature").subtitle,
                    description: seo?.find((x) => x.id === "feature")
                        .description,
                    features: seo?.find((x) => x.id === "feature").features,
                },
            },
            {
                id: "feature-2",
                props: {
                    title: seo?.find((x) => x.id === "feature").title,
                    subtitle: seo?.find((x) => x.id === "feature").subtitle,
                    description: seo?.find((x) => x.id === "feature")
                        .description,
                    features: seo?.find((x) => x.id === "feature").features,
                },
            },
        ],
    },
});

export const questionBlock8 = (seo?: any): ThreadMessage => ({
    id: "questionblock8",
    type: ThreadMessageType.QUESTION,
    content: "Choose your third block in landing page",
    payload: {
        blocks: [
            {
                id: "contact-1",
                props: {
                    title: seo?.find((x) => x.id === "contact").title,
                    subtitle: seo?.find((x) => x.id === "contact").subtitle,
                },
            },
            {
                id: "contact-2",
                props: {
                    title: seo?.find((x) => x.id === "contact").title,
                    subtitle: seo?.find((x) => x.id === "contact").subtitle,
                },
            },
        ],
    },
});

export const endMessage: ThreadMessage = {
    id: "end",
    type: ThreadMessageType.END,
    content: null,
    payload: {},
};

// export const question4: ThreadMessage = {
//     id: "question3",
//     type: ThreadMessageType.QUESTION,
//     content: "What is the price?",
// };
