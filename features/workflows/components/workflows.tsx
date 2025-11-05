"use client"

import { EntityContainer, EntityHeader } from "@/components/common/entity-components"
import { useSuspenseWorkflows } from "@/hooks/workflows/use-workflows"

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()
    return (
        <div className="flex-1 flex justify-center items-center">
            {JSON.stringify(workflows.data ,null,2)}
        </div>
    )
}

export const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {
    return (
        <>
        <EntityHeader 
        title="Workflows"
        description="Create and manage your workflows"
        onNew={()=>{}}
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
        >
            {children}
        </EntityContainer>
    )
}