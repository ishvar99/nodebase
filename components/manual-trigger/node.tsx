'use client'

import { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "../react-flow/base-execution-node";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { BaseTriggerNode } from "../react-flow/base-trigger-node";

type ManualTriggerNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown
}

type ManualTriggerNodeType = Node<ManualTriggerNodeData>;

export const ManualTriggerNode = memo((props: NodeProps<ManualTriggerNodeType>) => {
    const nodeData = props.data as ManualTriggerNodeData;
    return (
        <>
        <BaseTriggerNode 
        {...props}
        id={props.id}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        onSettings={() => {}}
        onDoubleClick={()=>{}}
        // status={nodeStatus}
        />
        </>
    )
})

ManualTriggerNode.displayName = "ManualTriggerNode"