"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModel } from "@/hooks/use-model-store";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";

const roleIconMap = {
    
}

export const MembersModel = () => {
    const { isOpen, onClose, type, data, onOpen } = useModel();

    const isModelOpen = isOpen && type === "members";
    const { server } = data as { server: ServerWithMembersWithProfiles};

    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center"> 
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 ">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map(member => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center">
                                    {member.profile.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}