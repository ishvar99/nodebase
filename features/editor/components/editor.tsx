"use client"

import { ErrorView, LoadingView } from "@/components/common/entity-components"
import { nodeTypes } from "@/config/node-types";
import { useSuspenseWorkflow } from "@/hooks/workflows/use-workflows"
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Edge, Node, NodeChange, EdgeChange, Connection, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo, useState } from "react";
import { AddNodeButton } from "./add-node-button";
import { useSetAtom } from "jotai";
import { editorAtom } from "../store/atoms";
import { NodeType } from "@/lib/generated/prisma/enums";
import { ExecuteWorkflowButton } from "./execute-workflow-button";


export const EditorLoading = () => {
    return <LoadingView message="Loading editor..."/>
}
export const EditorError= () => {
    return <ErrorView message="Error loading editor..."/>
}

export const Editor = ({workflowId}: {workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId)

    const setEditor = useSetAtom(editorAtom)

    const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
      );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
      );

    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
      );
     
      const hasManualTrigger = useMemo(() => {
        return nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER)
      },[nodes])

    return (
        <div className="size-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onInit={setEditor}
          nodeTypes={nodeTypes}
          proOptions={{
            hideAttribution: true
          }}
          snapGrid={[10,10]}
          snapToGrid
          panOnScroll
          panOnDrag={false}
          selectionOnDrag
          selectNodesOnDrag
        >
            <Background/>
            <Controls/>
            <MiniMap/>
            <Panel position="top-right">
                <AddNodeButton/>
            </Panel>
            {hasManualTrigger && 
            <Panel position="bottom-center">
            <ExecuteWorkflowButton workflowId={workflowId}/>
        </Panel>
            }
            </ReactFlow>
      </div>
    )
}