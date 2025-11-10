import { initialNode } from "@/components/react-flow/initial-node";
import { NodeType } from "@/lib/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeTypes = {
    [NodeType.INITIAL]: initialNode
} as NodeTypes

export type RegisteredNodeType = keyof typeof nodeTypes