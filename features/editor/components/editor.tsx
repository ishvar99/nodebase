"use client"

import { ErrorView, LoadingView } from "@/components/common/entity-components"
import { useSuspenseWorkflow } from "@/hooks/workflows/use-workflows"

export const EditorLoading = () => {
    return <LoadingView message="Loading editor..."/>
}
export const EditorError= () => {
    return <ErrorView message="Error loading editor..."/>
}

export const Editor = ({workflowId}: {workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId)
    return (
        <p>
            {JSON.stringify(workflow,null,2)}
        </p>
    )
}