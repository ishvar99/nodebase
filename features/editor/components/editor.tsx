"use client"

import { ErrorView, LoadingView } from "@/components/common/entity-components"
import { useSuspenseWorkflow } from "@/hooks/workflows/use-workflows"
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Edge, Node, NodeChange, EdgeChange, Connection, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from "react";


export const EditorLoading = () => {
    return <LoadingView message="Loading editor..."/>
}
export const EditorError= () => {
    return <ErrorView message="Error loading editor..."/>
}


const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
  ];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 

export const Editor = ({workflowId}: {workflowId: string}) => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
     

    const {data: workflow} = useSuspenseWorkflow(workflowId)
    return (
        <div className="size-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{
            hideAttribution: true
          }}
        >
            <Background/>
            <Controls/>
            <MiniMap/>
            </ReactFlow>
      </div>
    )
}