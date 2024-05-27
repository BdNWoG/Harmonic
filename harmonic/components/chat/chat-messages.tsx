"use client";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

interface ChatMessagesProps {
    name: string,
    member: Member,
    chatId: string, 
    apiUrl: string, 
    socketUrl: string,
    socketQuery: Record<string, string>, 
    paramKey: "channelId" | "messageId",
    paramValue: string, 
    type: "channel" | "message"
}

export const ChatMessages = ({
    name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

    //@ts-ignore
    if (status === "loading") {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading Messages...
                </p>
            </div>
        )
    } 

    if (status === "error") {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <ServerCrash className="w-7 h-7 text-zinc-500 my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something Went Wrong!
                </p>
            </div>
        )
    } 

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>
            <ChatWelcome type={type} name={name}/>
        </div>
    )
}