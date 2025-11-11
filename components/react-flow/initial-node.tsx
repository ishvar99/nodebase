'use client'

import type {NodeProps} from "@xyflow/react"
import { PlaceholderNode } from "./placeholder-node"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { WorkflowNode } from "./workflow-node"
import { NodeSelector } from "@/features/editor/components/node-selector"

export const initialNode = memo((props: NodeProps) => {
    const [selectorOpen, setSelectorOpen] = useState(false)
    return (
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
        <WorkflowNode showToolbar={false}>
        <PlaceholderNode {...props} onClick={()=> setSelectorOpen(true)}>
            <div className="flex items-center justify-center cursor-pointer">
                <PlusIcon className="size-4"/>
            </div>
        </PlaceholderNode>
        </WorkflowNode>
        </NodeSelector>
    )
})