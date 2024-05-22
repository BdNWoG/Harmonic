"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModel } from "@/hooks/use-model-store";

const formSchema = z.object({
    name: z.string().min(1, { message: "Server Name is Required!" }),
    imageUrl: z.string().min(1, { message: "Server Icon is Required!" }),
});

export const CreateServerModel = () => {
    const { isOpen, onClose, type } = useModel();
    const router = useRouter(); 

    const isModelOpen = isOpen && type === "createServer";

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: true,
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers", values);

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModelOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center"> 
                        Customize your Server!
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Create a Server with a Custom Name and Icon!
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint="serverImage" value={field.value} onChange={field.onChange} 
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                        Server Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} {...field} placeholder="Enter Server Name"
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem> 
                            )}/>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant="primary">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}