'use client'

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../react-flow/base-execution-node";
import { AVAILABLE_MODELS, GeminiDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";
import { fetchGeminiRealtimeToken } from "./actions";

type GeminiNodeData = {
    variableName?: string;
    systemPrompt?: string;
    userPrompt?: string;
    model?: any;
}

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const nodeData = props.data;
    const description = nodeData?.userPrompt ? `${nodeData.model || AVAILABLE_MODELS[0]} : ${nodeData.userPrompt.slice(0,50)}...` : "Not configured";
    const nodeStatus = useNodeStatus({nodeId: props.id, channel: GEMINI_CHANNEL_NAME, topic: "status", refreshToken: fetchGeminiRealtimeToken})
    const handleOpenSettings = () => setDialogOpen(true)
    const {setNodes} = useReactFlow()

    const handleSubmit = (values: any) => {
        setNodes((nodes)=> nodes.map((node) => {
            if(node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        ...values
                    }
                }
            }
            return node
        }))
    }
    return (
        <>
        <GeminiDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
        />
        <BaseExecutionNode 
        {...props}
        id={props.id}
        icon="/logos/gemini.svg"
        status={nodeStatus}
        name="Gemini Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        />
        </>
    )
})

GeminiNode.displayName = "GeminiNode"