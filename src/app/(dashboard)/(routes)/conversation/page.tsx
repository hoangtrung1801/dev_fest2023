"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { formSchema } from "./constants";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
// import useRef
import { renderToString } from "react-dom/server";
import Iframe from "react-iframe";
import { useRouter } from "next/navigation";

import { cn } from "../../../libs/utils";
import { UserAvatar } from "@/app/components/user-avatar";
import { BotAvatar } from "@/app/components/bot-avatar";
import {
    ChatCompletionRequestMessage,
    ChatCompletionRequestMessageRoleEnum,
    OpenAIApi,
} from "openai";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { backOff } from "exponential-backoff";
import openai from "@/app/libs/openai/chatConfig";
import { systemMessage, userMessage } from "@/app/libs/openai/chatConfig";
import Home from "@/app/components/templates/Home";
import { ThreadMessageType } from "@prisma/client";
import Hero1 from "@/components/hero1";
import Hero2 from "@/components/hero2";
import Feature1 from "@/components/feature1";
import Contact1 from "@/components/contact1";

type IMessage = {
    id: string;
    type: ThreadMessageType;
    content: Record<string, any>;
};

const Conversation = () => {
    const router = useRouter();
    const { data: session } = useSession();

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
                payload: block

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
        router.push("/landing-page");
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
    // const divRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const div = divRef.current;

    //     if (div) {
    //       div.scrollTo(0, 0);
    //     }

    //   }, []);
    // if (!session) {
    //     router.replace("/authen");
    // };

    useEffect(() => {
        console.log({ messages });
    }, [messages]);

    const [block, setBlock] = useState<any>(null)
    const clickHero = async (block) => {
        console.log(`${messages[messages.length - 1].id}-answer`)
        try {
            const response = await axios.post(`/api/threads/${threadId}`, {
                id: `${messages[messages.length - 1].id}-answer`,
                content: '',
                type: ThreadMessageType.ANSWER,
                payload: block

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
    }

    return (
        <div className="flex flex-col justify-start items-center md:h-[1000px] w-full  rounded-2xl">
            <div className="text-2xl font-bold ">
                Welcome back {session?.user?.name} !
            </div>
            <div className="mt-6 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" rounded-lg border w-full p-2 m md:px-6 focus-within:shadow-sm flex flex-row gap-2 "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 text-xl font-medium md:w-[1000px] outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Create your product description here"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className=" md:w-[200px] bg-black text-white"
                                type="submit"
                                disabled={isLoading}
                                size="icon"
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            ....loading This is icon for loading
                        </div>
                    )}
                    {messages.map((message) =>
                        message.type === ThreadMessageType.END ? null : (
                            <div
                                key={message.content}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg bg-green-200",
                                    message.type === ThreadMessageType.ANSWER
                                        ? "bg-white border border-black/10"
                                        : "bg-green-200"
                                )}
                            >
                                {message.type === ThreadMessageType.QUESTION ? (
                                    <BotAvatar />
                                ) : (
                                    <UserAvatar />
                                )}

                                {message.type !== ThreadMessageType.BLOCK && (

                                    <div>
                                        <p className="text-xl font-medium">
                                            {message.content}

                                        </p>
                                        {message?.payload && message.payload.blocks && (
                                            <div>
                                                {/* make a small hero section part in lading page in small size and sure that show all the part hero sectio */}

                                                <div>
                                                    {message.payload.blocks[0] && (
                                                        // <div className="w-[1600px] h-[900px] bg-white rounded-2xl ">
                                                        //     <header className="sticky top-0 bg-white">
                                                        //         <nav className="flex items-center justify-between px-4 py-3 text-sm">
                                                        //             <a href="#"><img src="logo.png" className="h-8" alt=""/></a>

                                                        //             <button className="lg:hidden p-2 text-gray-500">
                                                        //                 <svg viewBox="0 0 24 24" className="w-6 h-6">
                                                        //                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                        //                 </svg>
                                                        //             </button>

                                                        //             <div className="hidden gap-x-3 lg:flex">
                                                        //                 <a href="#">Product</a>
                                                        //                 <a href="#">Features</a>
                                                        //                 <a href="#">Marketplace</a>
                                                        //                 <a href="#">Company</a>
                                                        //             </div>

                                                        //             <a href="#" className="hidden lg:inline-block lg:ml-auto">Log in</a>

                                                        //         </nav>
                                                        //     </header>
                                                        //     <div className="relative isolate px-6 pt-14 lg:px-8">

                                                        //         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

                                                        //             <div className="text-center">
                                                        //                 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                                        //                     {message.payload.blocks[0].props.title}
                                                        //                 </h1>

                                                        //                 <p className="mt-6 text-lg leading-8 text-gray-600">
                                                        //                     {message.payload.blocks[0].props.subTitle}
                                                        //                 </p>

                                                        //                 <div className="mt-10 flex items-center justify-center gap-x-6">

                                                        //                     <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>

                                                        //                     <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>

                                                        //                 </div>
                                                        //             </div>

                                                        //         </div>

                                                        //     </div>



                                                        // </div>
                                                        <div className="flex flex-col gap-6">
                                                            <div onClick={() => clickHero(message.payload.blocks[0])} className="hover:cursor-pointer hover:scale-105 transition">

                                                                <Hero1 title={message.payload.blocks[0].props.title} subTitle={message.payload.blocks[0].props.subTitle} />
                                                            </div>
                                                            <div onClick={() => clickHero(message.payload.blocks[1])} className="hover:cursor-pointer hover:scale-105 transition">

                                                                <Hero2 title={message.payload.blocks[0].props.title} subTitle={message.payload.blocks[0].props.subTitle} />
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>



                                            </div>
                                        )}
                                        {message?.payload && message.payload.blocks  && (
                                            <div>
                                                {message.payload.blocks.length >= 3 && (
                                                    <div className="flex flex-col gap-6">
                                                        <div>
                                                            <Contact1
                                                                title={message.payload.blocks[2].props.title}
                                                                subTitle={message.payload.blocks[2].props.subTitle}

                                                            />


                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        )}




                                    </div>


                                )}
                            </div>
                        )
                    )}
                </div>
                {messages.length > 0 &&
                    messages[messages.length - 1].type ===
                    ThreadMessageType.END && (
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
