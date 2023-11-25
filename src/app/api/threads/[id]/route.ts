import prisma from "@/app/libs/prismadb";
import { ThreadMessage, ThreadMessageType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { question1, question2, question3 } from "../const";

const getPrefixId = (id: string) => {
    return id.split("-")[0];
};

const checkAnswerOfQuestion = (answerId: string, questionId: string) => {
    return (
        answerId.split("-")[0] === questionId &&
        answerId.split("-")[1] === "answer"
    );
};

export async function GET(req: NextRequest) {
    return NextResponse.json("Hello", { status: 200 });
}

export async function POST(req: NextRequest, context: any) {
    try {
        const threadId = context.params.id;
        const payload: ThreadMessage = await req.json();

        // find thread
        const threads = await prisma.thread.findMany();
        const thread = threads.find((thread) => thread.id === threadId);
        const threadInfo = thread?.info;

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

        // update thread info
        const answer = messages[messages.length - 1];
        if (getPrefixId(answer.id) === question1.id) {
            threadInfo.title = payload.content;
        } else if (getPrefixId(answer.id) === question2.id) {
            threadInfo.description = payload.content;
        } else if (getPrefixId(answer.id) === question3.id) {
            threadInfo.price = payload.content;
        }

        // update messages in thread
        messages?.push(payload);
        // add new question
        if (getPrefixId(payload.id) === question1.id) {
            messages?.push({
                id: question2.id,
                type: ThreadMessageType.QUESTION,
                content: question2.content,
            });
        } else if (getPrefixId(payload.id) === question2.id) {
            messages?.push({
                id: question3.id,
                type: ThreadMessageType.QUESTION,
                content: question3.content,
            });
        } else if (getPrefixId(payload.id) === question3.id) {
            messages?.push({
                id: "end",
                type: ThreadMessageType.TEXT,
                content: "Thank you for your information",
            });
            messages?.push({
                id: "end",
                type: ThreadMessageType.END,
                content: null,
            });
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
