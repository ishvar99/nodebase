'use client'

import { NodeProps, Position, useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import { ReactNode, memo } from "react";
import { WorkflowNode } from "./workflow-node";
import { BaseNode, BaseNodeContent } from "./base-node";
import Image from "next/image";
import { BaseHandle } from "./base-handle";
import { NodeStatusIndicator,type NodeStatus} from "./node-status-indicator";


 interface BaseTriggerNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    onSettings? : () => void;
    onDoubleClick?: () => void;
    status?: NodeStatus
 }

 export const BaseTriggerNode = memo((
    {
        id,
        icon: Icon,
        name,
        description,
        children,
        onSettings,
        onDoubleClick,
        status="initial"
    }: BaseTriggerNodeProps
 ) => {

    const {setNodes, setEdges} = useReactFlow();
    const handleDelete = () => {
        setNodes((currentNodes) => {
            const updatedNodes = currentNodes.filter((node) => node.id != id);
            return updatedNodes
        })
        setEdges((currentEdges) => {
            const updatedEdges = currentEdges.filter((edge) => edge.source != id && edge.target !=id);
            return updatedEdges
        })
    }
    return (
        <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
        >
            <NodeStatusIndicator status={status} variant="border" className="rounded-l-2xl">
            <BaseNode status={status} className="rounded-l-2xl relative group" onDoubleClick={onDoubleClick}>
                <BaseNodeContent>
                {typeof Icon === 'string' ? (
                    <Image src={Icon} alt={name} width={16} height={16}/>
                ): (
                <Icon className="size-4 text-muted-foreground"/> 
            )
                }
                {children}
                <BaseHandle id="source-1" type="source" position={Position.Right}/>
                </BaseNodeContent>
            </BaseNode>
            </NodeStatusIndicator>
        </WorkflowNode>
    )
 })

 BaseTriggerNode.displayName = "BaseExecutionNode";