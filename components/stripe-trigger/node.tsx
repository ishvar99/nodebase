'use client'

import { Node, NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../react-flow/base-trigger-node";
import { StripeDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/stripe-trigger";
import { fetchStripeTriggerRealtimeToken } from "./actions";

 
export const StripeTriggerNode = memo((props: NodeProps<Node>) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const nodeStatus = useNodeStatus({nodeId: props.id, channel: STRIPE_TRIGGER_CHANNEL_NAME, topic: 'status', refreshToken: fetchStripeTriggerRealtimeToken})
    const handleOpenSettings  = () => setDialogOpen(true)
    return (
        <>
        <StripeDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
        <BaseTriggerNode 
        {...props}
        id={props.id}
        icon="/logos/stripe.svg"
        name="Stripe"
        description="When stripe even is captured"
        onSettings={handleOpenSettings}
        status={nodeStatus}
        onDoubleClick={handleOpenSettings}
        />
        </>
    )
})

StripeTriggerNode.displayName = "StripeTriggerNode"