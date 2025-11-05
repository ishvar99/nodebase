import { useTRPC } from "@/trpc/client"
import { getQueryClient } from "@/trpc/server"
import { QueryClient, useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions())
}

export const useCreateWorkflow = () => {
    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = getQueryClient();
    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" created`)
            router.push(`/workflows/${data.id}`)
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions(),
            )
        },
        onError: (error) => {
            toast.error(`Failed to create workflow ${error.message}`)
        }
    }))
}