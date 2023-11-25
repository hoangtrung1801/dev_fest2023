import prisma from "@/app/libs/prismadb";
import { NextFetchEvent, NextResponse, NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { question0, question1 } from "./const";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function GET(req: NextFetchEvent) {
    try {
        const threads = await prisma.thread.findMany();
        return NextResponse.json(threads, {
            status: 200,
        });
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}

export async function POST(req: Request) {
    // create thread
    try {
        const newThread = await prisma.thread.create({
            data: {
                messages: [question0, question1],
                info: {},
            },
        });
        return NextResponse.json(newThread, {
            status: 200,
        });
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}

export async function DELETE(req: Request) {
    // create thread
    try {
        await prisma.thread.deleteMany();
        return NextResponse.json(
            {},
            {
                status: 200,
            }
        );
    } catch (e: any) {
        return new NextResponse(e.message, {
            status: 500,
        });
    }
}
