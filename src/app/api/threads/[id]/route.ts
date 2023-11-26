import prisma from "@/app/libs/prismadb";
import { ThreadMessage, ThreadMessageType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
    endMessage,
    question1,
    question2,
    question3,
    question4,
    question5,
    questionBlock6,
    questionBlock7,
    questionBlock8,
    questionConfirmSeoContent,
} from "../const";
import { generateSeoContent } from "../genearte-seo-content";

const getPrefixId = (id: string) => {
    return id.split("-")[0];
};

const checkAnswerOfQuestion = (answerId: string, questionId: string) => {
    return (
        answerId.split("-")[0] === questionId &&
        answerId.split("-")[1] === "answer"
    );
};

export async function GET(req: NextRequest, context: any) {
    try {
        const threadId = context.params.id;
        // const payload: ThreadMessage = await req.json();

        // find thread
        const threads = await prisma.thread.findMany();
        const thread = threads.find((thread) => thread.id === threadId);

        return NextResponse.json({ ...thread }, { status: 200 });
    } catch (e) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}

export async function POST(req: NextRequest, context: any) {
    try {
        const threadId = context.params.id;
        const payload: ThreadMessage = await req.json();

        // find thread
        const threads = await prisma.thread.findMany();
        const thread = threads.find((thread) => thread.id === threadId);
        const threadInfo = thread?.info ?? {};

        if (!threadInfo) {
            return NextResponse.json(
                { message: "NOT FOUND INFO" },
                { status: 404 }
            );
        }

        let messages = thread?.messages;
        if (!messages) {
            return NextResponse.json(
                { message: "NOT FOUND MESSAGES" },
                { status: 404 }
            );
        }

        if (payload.type !== ThreadMessageType.ANSWER) {
            return NextResponse.json(
                { message: "NOT ANSWER" },
                { status: 400 }
            );
        }

        if (
            !checkAnswerOfQuestion(
                payload.id,
                messages[messages?.length - 1].id
            )
        ) {
            return NextResponse.json(
                { message: "NOT SUITABLE ANSWER" },
                { status: 400 }
            );
        }

        // generate seo content
        // -> seocontent & seocontent-answer
        // update thread info
        const answer = messages[messages.length - 1];
        if (getPrefixId(answer.id) === question1.id) {
            threadInfo.title = payload.content;
        } else if (getPrefixId(answer.id) === question2.id) {
            threadInfo.description = payload.content;
        } else if (getPrefixId(answer.id) === question3.id) {
            threadInfo.price = payload.content;
        } else if (getPrefixId(answer.id) === question4.id) {
            threadInfo.style = payload.content;
        } else if (getPrefixId(answer.id) === question5.id) {
            threadInfo.color = payload.content;
        } else if (
            [
                questionBlock6().id,
                questionBlock7().id,
                questionBlock8().id,
            ].includes(getPrefixId(answer.id))
        ) {
            if (!threadInfo?.blocks) threadInfo.blocks = [];
            threadInfo?.blocks.push(payload.payload);
        }

        // update messages in thread
        messages?.push(payload);
        // add new question
        if (getPrefixId(payload.id) === question1.id) {
            messages?.push(question2);
        } else if (getPrefixId(payload.id) === question2.id) {
            messages?.push(question3);
        } else if (getPrefixId(payload.id) === question3.id) {
            messages.push(question4);
        } else if (getPrefixId(payload.id) === question4.id) {
            messages.push(question5);
        } else if (getPrefixId(payload.id) === question5.id) {
            // generate seo content
            const { title, description, price } = threadInfo;
            const { content, data } = await generateSeoContent(
                title,
                description,
                price
            );
            // const content = `
            // 1. Hero Block Title: Introducing the iPhone 15 - Fuse Brilliance with Performance subtitle: Immerse in a world of unbelievable functionality and breathtaking clarity with the revolutionary iPhone 15, the latest addition to the iPhone series. 2. Feature Block Title: Marvel in the distinct features of iPhone 15 subtitle: A breakthrough in smartphone technology with an unbeatable display, illuminating brightness, and an unmatched camera system. Description: Launched in September 2023, iPhone 15 is the epitome of innovation, embracing a 6.1 inch Super Retina XDR display, setting the standard for an immersive viewing experience. Illuminate your world with up to 2000 nits of brightness and experience the first-of-its-kind Dynamic Island. With the powerful USB-C port, keep your digital life at your finger tips, easing charging and data transfer. Features: * Unravel a new realm in photography with a 48MP main camera offering 2x zoom, along with the advanced dual-camera system that includes 48MP main, 12MP ultra-wide, and 12MP 2x telephoto cameras. * Accommodate your digital life with storage capacities of 128GB, 256GB, and 512GB, ensuring no memory is left uncaptured. * Power-packed A16 Bionic chip with a 6-core CPU and a 5-core GPU improving performance and efficiency. * Appreciate durability with the iPhone 15’s splash, water, and dust resistance capabilities guaranteed by an IP68 rating. 3. Contact Block Title: Reach Out for Your iPhone 15 subtitle: Optimise productivity and step into the future. Get your iPhone 15 today. (Note: Do remember to keep SEO principles in mind while incorporating product features. SEO content should go beyond just listing features. Contextualize the features into benefits and things that potential customers care about. Also, Always write with your audience's language and comprehend the product yourself.)
            //             `;
            // const data = [
            //     {
            //         id: "hero",
            //         title: "Presenting the all-new iPhone 15",
            //         subtitle:
            //             "Get ready to experience advancement like never before",
            //     },
            //     {
            //         id: "feature",
            //         title: "iPhone 15 - Innovation at its Best",
            //         subtitle:
            //             "A revolutionary upgrade to redefine your smartphone experience",
            //         description:
            //             "The iPhone 15, launched in September 2023, boasts a 6.1-inch Super Retina XDR display that ticks up to 2000 nits of brightness, ensuring a stunning visual experience. Going beyond just aesthetics, it is powered by the powerful A16 Bionic chip with a 6-core CPU and a 5-core GPU that guarantees smooth and faster operations.",
            //         features: [
            //             "The phone supports charging and data transfer through the efficient USB-C port.",
            //             "The 48MP main camera is designed to capture 2x zoom shots with high precision.",
            //             "Storage is never going to be an issue with options of 128GB, 256GB, and 512GB capacity.",
            //             "The advanced dual-camera system including a 48MP main camera, a 12MP ultra-wide camera, and a 12MP 2x telephoto camera ensures ultimate photography.",
            //             "With an IP68 rating, the phone is designed to be splash, water, and dust resistant, making it your perfect companion for every journey.",
            //         ],
            //     },
            //     {
            //         id: "contact",
            //         title: "Get Your iPhone 15 Today",
            //         subtitle:
            //             "Grab the technological marvel priced at just $999",
            //     },
            // ];

            // await new Promise((resolve) => setTimeout(resolve, 5000));

            messages.push({
                id: "generate-seocontent",
                type: ThreadMessageType.TEXT,
                content,
                payload: {},
            });
            messages.push(questionConfirmSeoContent);

            if (data) {
                threadInfo["seo"] = data;
            }
        } else if (getPrefixId(payload.id) === questionConfirmSeoContent.id) {
            messages.push(questionBlock6(threadInfo["seo"]));
        } else if (getPrefixId(payload.id) === questionBlock6().id) {
            messages.push(questionBlock7(threadInfo["seo"]));
        } else if (getPrefixId(payload.id) === questionBlock7().id) {
            console.log(
                "question block 8",
                getPrefixId(payload.id),
                questionBlock8(threadInfo["seo"])
            );
            messages.push(questionBlock8(threadInfo["seo"]));
        } else if (getPrefixId(payload.id) === questionBlock8().id) {
            messages.push(endMessage);
        }

        await prisma.thread.update({
            where: {
                id: thread?.id,
            },
            data: {
                messages: messages,
                info: threadInfo,
            },
        });

        return NextResponse.json({ ...thread, messages });
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}
