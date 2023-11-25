import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { systemMessage } from "@/app/libs/openai/chatConfig";



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { messages } = body;
        if (!configuration.apiKey) {
            throw new Error("No OPENAI_API_KEY environment variable found.");
        }

        if (!messages) {
            throw new Error("No text provided");
        }

        const response = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            
            messages : [...messages, systemMessage]
            
        })

        return NextResponse.json(response.data.choices[0].message)
     
    } catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error in conversation API", { status: 500 });
        
    }
}
