import { ThreadMessage } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

type Block = {
    id: string;
    props: Record<string, any>;
};

const sampleBlocks: Block[] = [
    {
        id: "hero-1",
        props: {
            title: "Hero 1",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ",
        },
    },
    {
        id: "feature-1",
        props: {
            title: "Feature",
            features: [
                {
                    title: "Feature 1",
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                },
                {
                    title: "Feature 2",
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                },
                {
                    title: "Feature 3",
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                },
                {
                    title: "Feature 4",
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                },
            ],
        },
    },
    {
        id: "contact-1",
        props: {},
    },
];

export async function POST(req: NextRequest, context: any) {
    try {
        // const threadId = context.params.id;
        // const payload: ThreadMessage = await req.json();

        // find thread
        // const threads = await prisma.thread.findMany();
        // const thread = threads.find((thread) => thread.id === threadId);
        // const threadInfo = thread?.info;

        // if (
        //     !threadInfo?.title &&
        //     !threadInfo?.description &&
        //     !threadInfo?.price
        // ) {
        //     return NextResponse.json(
        //         { message: "PLEASE COMPLETE THREAD INFO" },
        //         { status: 404 }
        //     );
        // }

        // request prompt to answer
        return NextResponse.json(
            {
                blocks: sampleBlocks,
            },
            { status: 200 }
        );
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}
