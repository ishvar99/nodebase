'use client'

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client"
import {useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { LogoutButton } from "./logout";
import { toast } from "sonner";

export const     Client = () => {  
    const {data} = authClient.useSession()
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    const {data: workflows} = useSuspenseQuery(trpc.getWorkflows.queryOptions());
    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: () => {
           toast.success("Job queued")
        }
    }));
    const testAi = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success("AI  Job queued")
         }
    }))
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
            {JSON.stringify(workflows)}
            <Button disabled={create.isPending} onClick={()=> create.mutate()}>
            Create workflow
            </Button>
            <Button disabled={create.isPending} onClick={()=> testAi.mutate()}>
                Test AI
            </Button>
           <LogoutButton/>
        </div>

    )
    
}