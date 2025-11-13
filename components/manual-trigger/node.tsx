'use client'

import { Node, NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../react-flow/base-execution-node";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { BaseTriggerNode } from "../react-flow/base-trigger-node";
import { ManualTriggerDialog } from "./dialog";

type ManualTriggerNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown
}

type ManualTriggerNodeType = Node<ManualTriggerNodeData>;

export const ManualTriggerNode = memo((props: NodeProps<ManualTriggerNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const nodeStatus ="success"
    const handleOpenSettings  = () => setDialogOpen(true)
    return (
        <>
        <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
        <BaseTriggerNode 
        {...props}
        id={props.id}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        onSettings={handleOpenSettings}
        status={nodeStatus}
        onDoubleClick={()=>{}}
        // status={nodeStatus}
        />
        </>
    )
})

ManualTriggerNode.displayName = "ManualTriggerNode"