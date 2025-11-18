import { prisma } from "@/prisma/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {createOpenAI}  from "@ai-sdk/openai";
import {createAnthropic}  from "@ai-sdk/anthropic";
import { generateText } from 'ai';
import * as Sentry from "@sentry/nextjs";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";
import { getExecutor } from "@/config/executor-regsitry";
import { NodeType } from "@/lib/generated/prisma/enums";
import { httpRequestChannel } from "./channels/http-request";
 
export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow", 
    channels: [
      httpRequestChannel()
    ]
  },
  async ({ event, step, publish}) => { 
  const workflowId = event.data.workflowId;
  if(!workflowId){
    throw new NonRetriableError("Workflow ID is missing")
  }
  const sortedNodes = await step.run("prepare-workflow", async () => {
    const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
            id: workflowId
        },
        include: {
            nodes: true,
            connections: true
        }
    })
    return topologicalSort(workflow.nodes,workflow.connections)
  })
  let context = event.data.initialData || {}

  for(const node of sortedNodes){
    const executor = getExecutor(node.type as NodeType)
    context = await executor({
      data: node.data as Record<string,unknown>,
      nodeId: node.id,
      context,
      step,
      publish
    })
  }
  return {workflowId, result: context}
  },
  
);