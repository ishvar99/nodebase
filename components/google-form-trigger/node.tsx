'use client'

import { Node, NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { MousePointerIcon } from "lucide-react";
import { BaseTriggerNode } from "../react-flow/base-trigger-node";
import { GoogleFormTriggerForm } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { MANUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger";
import { fetchManualTriggerRealtimeToken } from "@/features/executions/components/manual-trigger/actions";

type GoogleFormTriggerNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown
}

type GoogleFormTriggerType = Node<GoogleFormTriggerNodeData>;

export const GoogleFormTriggerNode = memo((props: NodeProps<GoogleFormTriggerType>) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const nodeStatus = 'initial'
    const handleOpenSettings  = () => setDialogOpen(true)
    return (
        <>
        <GoogleFormTriggerForm open={dialogOpen} onOpenChange={setDialogOpen}/>
        <BaseTriggerNode 
        {...props}
        id={props.id}
        icon="/logos/googleform.svg"
        name="Google From"
        description="When form is submitted"
        onSettings={handleOpenSettings}
        status={nodeStatus}
        onDoubleClick={handleOpenSettings}
        />
        </>
    )
})

GoogleFormTriggerNode.displayName = "GoogleFormTriggerNode"