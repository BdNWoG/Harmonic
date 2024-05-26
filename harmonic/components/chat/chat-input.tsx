"use client"

import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import qs from "query-string";

import { Form, FormField, FormControl, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Plus, Smile } from "lucide-react";

interface ChatInputProps {
    apiUrl: string, 
    query: Record<string, any>, 
    name: string, 
    type: "channel" | "message"
}

const formSchema = z.object({
    message: z.string().min(1)
});

export const ChatInput = ({ 
    apiUrl, query, name, type 
}: ChatInputProps & { type: "channel" | "message"}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "", //
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="message"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="relative p-4 pb-6">
                                <button type="button" onClick={() => {}}
                                className="absolute left-8 top-7 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center">
                                    <Plus className="text-white dark:text-[#313338]"/>
                                </button>
                                <Input disabled={isLoading} placeholder={`Message ${type === "message" ? name : "#" + name}`} {...field}
                                className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"/>
                                <div className="top-7 right-8 absolute">
                                    <Smile/>
                                </div>
                            </div>
                        </FormControl>
                    </FormItem>
                )}/>
            </form>
        </Form>
    )
}