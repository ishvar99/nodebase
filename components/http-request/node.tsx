'use client'

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../react-flow/base-execution-node";
import { GlobeIcon } from "lucide-react";
import { HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const nodeData = props.data;
    const description = nodeData?.endpoint ? `${nodeData.method || 'GET'} : ${nodeData.endpoint}` : "Not configured";
    const nodeStatus = "initial"
    const handleOpenSettings = () => setDialogOpen(true)
    const {setNodes} = useReactFlow()

    const handleSubmit = (values: {
        endpoint: string;
        method: string;
        body?: string;
    }) => {
        setNodes((nodes)=> nodes.map((node) => {
            if(node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body
                    }
                }
            }
            return node
        }))
    }
    return (
        <>
        <HttpRequestDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint} // TODO:: Check if it can be improved by just sending initalValues={nodeData}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
        />
        <BaseExecutionNode 
        {...props}
        id={props.id}
        icon={GlobeIcon}
        status={nodeStatus}
        name="HTTP Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        />
        </>
    )
})

HttpRequestNode.displayName = "HttpRequestNode"