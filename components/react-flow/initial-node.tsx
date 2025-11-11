'use client'

import type {NodeProps} from "@xyflow/react"
import { PlaceholderNode } from "./placeholder-node"
import { PlusIcon } from "lucide-react"
import { memo } from "react"
import { WorkflowNode } from "./workflow-node"

export const initialNode = memo((props: NodeProps) => {
    return (
        <WorkflowNode showToolbar={false}>
        <PlaceholderNode {...props}>
            <div className="flex items-center justify-center cursor-pointer">
                <PlusIcon className="size-4"/>
            </div>
        </PlaceholderNode>
        </WorkflowNode>
    )
})