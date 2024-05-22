"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

interface ServerHeaderPropos {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderPropos) => {
    return (
        <div>
            Server Header
        </div>
    )
};