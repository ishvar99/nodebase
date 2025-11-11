'use client'

import { NodeProps, Position } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import { ReactNode, memo } from "react";
import { WorkflowNode } from "./workflow-node";
import { BaseNode, BaseNodeContent } from "./base-node";
import Image from "next/image";
import { BaseHandle } from "./base-handle";


 interface BaseTriggerNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    onSettings? : () => void;
    onDoubleClick?: () => void;
    status?: any
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
        status
    }: BaseTriggerNodeProps
 ) => {

    const handleDelete = () => {

    }
    return (
        <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
        >
            <BaseNode className="rounded-l-2xl relative group" onDoubleClick={onDoubleClick}>
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
        </WorkflowNode>
    )
 })

 BaseTriggerNode.displayName = "BaseExecutionNode";