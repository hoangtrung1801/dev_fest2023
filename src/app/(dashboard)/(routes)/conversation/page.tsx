'use client'

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { formSchema } from "./constants";
import { Form, FormField, FormControl, FormItem } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
// import useRef
import { renderToString } from 'react-dom/server';
import Iframe from "react-iframe";
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
import Home from "@/app/components/templates/Home";
import Image from "next/image";











const Conversation = () => {
    const router = useRouter();
    const { data: session } = useSession();

   const [showBlockHero, setShowBlockHero] = useState(false);
   const [isLoadingConversation, setIsLoadingConversation] = useState(false);
   const [choosingTemplate, setChoosingTemplate] = useState(false);







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

    const homeComponentString = renderToString(<Home />);


   

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
                            className="
                        rounded-lg 
                        border
                        w-full 
                        p-2
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
                                                placeholder="Create your product description here"
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

              
                <div className="space-y-4 mt-4">
                    <div className="text-2xl"> Please choose your Hero block </div>
                       <div 
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg bg-green-200")}
                        >
                           
                            <div className="flex flex-col gap-2">
                         
                                <Image onClick={()=>{
                                      setIsLoadingConversation(true);
                                      setChoosingTemplate(true)
                                      setTimeout(()=>{
                                        setShowBlockHero(true);
                                        setIsLoadingConversation(false)
                                      },2000)
                                    setShowBlockHero(true)}} className={cn("hover:cursor-pointer rounded-xl  hover:scale-105 transition", choosingTemplate ? "border-black border-2 scale-105" : "")} width={560} height={315} src="/templates/template1.jpg" alt="template1"/>
                                <Image onClick={()=>{
                                      setIsLoadingConversation(true);
                                      setChoosingTemplate(true)
                                      setTimeout(()=>{
                                        setShowBlockHero(true);
                                        setIsLoadingConversation(false)
                                      },2000)
                                    setShowBlockHero(true)}} className={cn("hover:cursor-pointer rounded-xl  hover:scale-105 transition", choosingTemplate ? "border-black border-2 scale-105" : "")} width={560} height={315} src="/templates/template1.jpg" alt="template1"/>
                            </div>
                           <div className="flex flex-col gap-2">
                              <Image onClick={()=>{
                                  setIsLoadingConversation(true);
                                  setChoosingTemplate(true)
                                  setTimeout(()=>{
                                    setShowBlockHero(true);
                                    setIsLoadingConversation(false)
                                    setChoosingTemplate(true)
                                  },2000)
                                setShowBlockHero(true)}} className={cn("hover:cursor-pointer rounded-xl  hover:scale-105 transition", choosingTemplate ? "border-black border-2 scale-105" : "")} width={560} height={315} src="/templates/template1.jpg" alt="template1"/>
                              <Image onClick={()=>{
                                  setIsLoadingConversation(true);
                                  setTimeout(()=>{
                                    setShowBlockHero(true);
                                    setIsLoadingConversation(false);
                                  },2000)
                                setShowBlockHero(true)}} className={cn("hover:cursor-pointer rounded-xl  hover:scale-105 transition", choosingTemplate ? "border-black border-2 scale-105" : "")} width={560} height={315} src="/templates/template1.jpg" alt="template1"/>

                           </div>   

                          
                        </div>
                        {isLoadingConversation && (  <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900">
                        </div>)}
                    {
                    // show the div when setShowBlockHero true and setIsloadingConversation false condition
                    showBlockHero && !isLoadingConversation &&
                    (
                                                <div   className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg bg-green-200 transition ease-in-out transform origin-top")}>
                                                 Choosing your Hero Block
                                                </div>

                    )}                       
                    {isLoading && (
                    //    i want the loading effect turn arround effect animation here
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                            <span className="sr-only">Loading...</span>
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

