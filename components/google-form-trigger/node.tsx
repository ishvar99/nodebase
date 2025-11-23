'use client'

import { Node, NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../react-flow/base-trigger-node";
import { GoogleFormTrigger } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME, googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";
import { fetchGoogleFormTriggerRealtimeToken } from "./actions";

type GoogleFormTriggerNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown
}

type GoogleFormTriggerType = Node<GoogleFormTriggerNodeData>;
 
export const GoogleFormTriggerNode = memo((props: NodeProps<GoogleFormTriggerType>) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const nodeStatus = useNodeStatus({nodeId: props.id, channel:GOOGLE_FORM_TRIGGER_CHANNEL_NAME, topic: 'status', refreshToken: fetchGoogleFormTriggerRealtimeToken})
    const handleOpenSettings  = () => setDialogOpen(true)
    return (
        <>
        <GoogleFormTrigger open={dialogOpen} onOpenChange={setDialogOpen}/>
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