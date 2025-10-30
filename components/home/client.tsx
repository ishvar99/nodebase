'use client'

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

export const  Client = () => {
    const {data} = authClient.useSession()
    const trpc = useTRPC();
    const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions());
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
            {JSON.stringify(data)}
           { 
           data &&
        <Button>
            Logout
        </Button>
            }
        </div>

    )
    
}