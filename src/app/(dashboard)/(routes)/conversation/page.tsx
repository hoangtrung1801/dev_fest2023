"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/app/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { formSchema } from "./constants";
// import useRef
import { useRouter } from "next/navigation";
import { renderToString } from "react-dom/server";

import Home from "@/app/components/templates/Home";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "../../../libs/utils";

import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import { getComponent } from "@/app/libs/getComponent";
import { ThreadMessage, ThreadMessageType } from "@prisma/client";

// type IMessage = {
//     id: string;
//     type: ThreadMessageType;
//     content: Record<string, any>;
// };

type IMessage = ThreadMessage;

const Conversation = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [showBlockHero, setShowBlockHero] = useState(false);
    const [isLoadingConversation, setIsLoadingConversation] = useState(false);
    const [choosingTemplate, setChoosingTemplate] = useState(false);

    // const [messages, setMessages] = useState<[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [threadId, setThreadId] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            form.reset();
            const response = await axios.post(`/api/threads/${threadId}`, {
                id: `${messages[messages.length - 1].id}-answer`,
                content: values.prompt,
                type: ThreadMessageType.ANSWER,
                payload: block,
            } as unknown as IMessage);
            const data: any = response.data;
            const newMessages: IMessage[] = data?.messages;

            setMessages(newMessages);
            console.log({ data });
        } catch (error: any) {
            if (error?.response?.status === 403) {
                toast.error("You are not authorized to perform this action.");
            } else {
                toast.error("Something went wrong.");
            }
        }
    };

    const onGenerateLandingPage = () => {
        router.push(`/landing-page/${threadId}`);
    };

    useEffect(() => {
        const fetching = async () => {
            form.reset();

            const response = await axios.post("/api/threads");
            const data = response.data;

            setMessages((messages) => [...messages, ...data.messages]);
            setThreadId(data.id);

            console.log({ response });
        };
        fetching();

        return () => {
            setMessages([]);
        };
    }, []);

    const homeComponentString = renderToString(<Home />);

    useEffect(() => {
        console.log({ messages });
    }, [messages]);

    const [block, setBlock] = useState<any>(null);
    const chooseBlock = async (block) => {
        try {
            const response = await axios.post(`/api/threads/${threadId}`, {
                id: `${messages[messages.length - 1].id}-answer`,
                content: "",
                type: ThreadMessageType.ANSWER,
                payload: block,
            } as unknown as IMessage);
            const data: any = response.data;
            const newMessages: IMessage[] = data?.messages;

            setMessages(newMessages);
            console.log({ data });
        } catch (error: any) {
            if (error?.response?.status === 403) {
                toast.error("You are not authorized to perform this action.");
            } else {
                toast.error("Something went wrong.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-start items-center w-full  rounded-2xl py-6 relative container mx-auto">
            <div className="text-2xl font-bold font-mono ">
                GEN-AD : SIMPLE TO LANDING PAGE
            </div>
            <div className="mt-6 lg:px-8 relative">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-row space-x-4 fixed bottom-0 right-0 left-0 container mx-auto pb-8"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                className="flex-1"
                                                disabled={isLoading}
                                                placeholder="Create your product description here"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className=" bg-black text-white px-4 py-2 w-fit"
                                type="submit"
                                disabled={isLoading}
                                size="icon"
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4 flex flex-col justify-start">
                    {isLoadingConversation && (
                        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
                    )}
                    {
                        // show the div when setShowBlockHero true and setIsloadingConversation false condition
                        showBlockHero && !isLoadingConversation && (
                            <div
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg bg-green-200 transition ease-in-out transform origin-top"
                                )}
                            >
                                Choosing your Hero Block
                            </div>
                        )
                    }
                    {isLoading && (
                        //    i want the loading effect turn arround effect animation here
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    {messages.map((message) =>
                        message.type === ThreadMessageType.END ? null : (
                            <div
                                key={message.id}
                                className={cn(
                                    "p-4 flex space-x- rounded-lg ",
                                    message.type === ThreadMessageType.ANSWER
                                        ? "bg-[rgb(215,236,246)] shadow-lg border-black border-1 "
                                        : "bg-white border-1 border-black shadow-lg"
                                )}
                            >
                                {message.type === ThreadMessageType.ANSWER ? (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/user.png" />
                                    </Avatar>
                                ) : (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/bot2.jpg" />
                                    </Avatar>
                                )}

                                <div className="flex flex-col space-y-4">
                                    {message?.content !== "" && (
                                        <p className="font-medium">
                                            {message.content}
                                        </p>
                                    )}

                                    {message.type ===
                                        ThreadMessageType.QUESTION &&
                                        message.id.includes(
                                            "questionblock"
                                        ) && (
                                            <div className="flex flex-col space-y-2">
                                                {message.type ===
                                                    ThreadMessageType.QUESTION &&
                                                    message.id.includes(
                                                        "questionblock"
                                                    ) &&
                                                    message.payload?.blocks?.map(
                                                        (block) => (
                                                            <div
                                                                key={block.id}
                                                                style={{
                                                                    zoom: 0.5,
                                                                }}
                                                                className="hover:cursor-pointer"
                                                                onClick={() =>
                                                                    chooseBlock(
                                                                        block
                                                                    )
                                                                }
                                                            >
                                                                {getComponent(
                                                                    block.id,
                                                                    block.props
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                </div>
                            </div>
                        )
                    )}
                </div>

                {messages.some(
                    (message) => message.type === ThreadMessageType.END
                ) && (
                    <div className="w-full flex justify-end mt-4">
                        <Button
                            variant="secondary"
                            onClick={onGenerateLandingPage}
                        >
                            Continue
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conversation;
