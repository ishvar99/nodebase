'use client'

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { LogoutButton } from "./logout";

export const     Client = () => {
    const {data} = authClient.useSession()
    const trpc = useTRPC();
    const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions());
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
            {JSON.stringify(data)}
           { 
           data && <LogoutButton/>
            }
        </div>

    )
    
}