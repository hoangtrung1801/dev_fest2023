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
        await prisma.thread.update({
            where: {
                id: thread?.id,
            },
            data: {
                messages: messages,
                info: threadInfo,
            },
        });

        return NextResponse.json({ threadId, payload, thread });
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}
