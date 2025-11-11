import { HttpRequestNode } from "@/components/http-request/node";
import { ManualTriggerNode } from "@/components/manual-trigger/node";
import { initialNode } from "@/components/react-flow/initial-node";
import { NodeType } from "@/lib/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeTypes = {
    [NodeType.INITIAL]: initialNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggerNode, 
} as NodeTypes

export type RegisteredNodeType = keyof typeof nodeTypes