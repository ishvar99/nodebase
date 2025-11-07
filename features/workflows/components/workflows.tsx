"use client"

import { EntityContainer, EntityHeader, EntitySearch } from "@/components/common/entity-components"
import { useUpgradeModal } from "@/hooks/subscriptions/use-upgrade-modal"
import { useCreateWorkflow, useSuspenseWorkflows } from "@/hooks/workflows/use-workflows"
import { useRouter } from "next/navigation"

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()
    return (
        <div className="flex-1 flex justify-center items-center">
            {JSON.stringify(workflows.data ,null,2)}
        </div>
    )
}

export const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {
    const createWorkflow = useCreateWorkflow();
    const {handleError,modal}= useUpgradeModal(); 
    const router = useRouter();
    const handleCreate = () => {
        createWorkflow.mutate(undefined,{
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
    return (
        <>
        {modal}
        <EntityHeader 
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={false}
        />
        </>
    )
}

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <EntityContainer
        header={<WorkflowsHeader/>}
        search={<WorkflowsSearch/>}
        >
            {children}
        </EntityContainer>
    )
}

export const WorkflowsSearch = () => {
    return (
        <EntitySearch
        value={""}
        onChange={()=>{}}
        placeholder="Search worklows"
        />
    )
}