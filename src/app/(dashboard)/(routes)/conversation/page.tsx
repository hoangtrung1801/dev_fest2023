'use client'

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { formSchema } from "./constants";
import { Form, FormField, FormControl, FormItem } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

import { useRouter } from "next/navigation";

import { cn } from "../../../libs/utils";
import { UserAvatar } from "@/app/components/user-avatar";
import { BotAvatar } from "@/app/components/bot-avatar";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, OpenAIApi } from "openai";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {backOff} from "exponential-backoff";
import openai from "@/app/libs/openai/chatConfig";
import { systemMessage, userMessage } from "@/app/libs/openai/chatConfig";






// vissualize the messages array data for me, data take from openai
// interface ChatCompletionRequestMessage {
//     content: string;
//     role: "user" | "bot";
// }





const Conversation = () => {
    const router = useRouter();
    const { data: session } = useSession();








    // const [messages, setMessages] = useState<[]>([]);
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values);
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
            // const completion = await openai.chat.completions.create({
            //     messages: [{ role: "system", content: "You are a helpful assistant." }],
            //     model: "gpt-3.5-turbo",
            //   });



            const newMessages = [...messages, userMessage];
            const response = await axios.post('/api/conversation', { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                toast.error("You are not authorized to perform this action.");
            } else {
                toast.error("Something went wrong.");
            }
        }
        finally {
            router.refresh();
        }
    }

    // if (!session) {
    //     router.replace("/authen");
    // };

    return (
        <div className="flex flex-col justify-start items-center md:h-[1000px] w-full  rounded-2xl">
            <div className="text-4xl font-bold md:mt-9">
                Welcome back, {session?.user?.name} !
            </div>
            <div className="mt-6 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                        rounded-lg 
                        border
                        w-full 
                        p-4 
                        m 
                        md:px-6 
                        focus-within:shadow-sm
                        flex flex-row
                        gap-2
                        "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 text-xl font-medium md:w-[1000px] outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of a circle?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className=" md:w-[200px] bg-black text-white" type="submit" disabled={isLoading} size="icon">Generate</Button>

                        </form>
                    </Form>

                </div>

                {/* conversation field */}
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            ....loading This is icon for loading
                        </div>
                    )}
                    {messages.map((message) => (
                        <div key={message.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg bg-green-200", message.role === "user" ? "bg-white border border-black/10" : "bg-green-200")}
                        >
                            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                            <p className="text-xl font-medium"> {message.content}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Conversation;


const messageDemo = [
    {
        "content": "Hello, how are you?",
        "role": "user"
    },
    {
        "content": "I am doing great, What can i help you?",
        "role": "bot"

    },
    {
        "content": "So i have problem with my blossom ",
        "role": "user"
    }, {
        "content": "What is the problem?",
        "role": "bot"

    },
    {
        "content": "My blossom's leaf have a lot of brown spot",
        "role": "user"

    }
]

