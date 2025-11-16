import { prisma } from "@/prisma/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {createOpenAI}  from "@ai-sdk/openai";
import {createAnthropic}  from "@ai-sdk/anthropic";
import { generateText } from 'ai';
import * as Sentry from "@sentry/nextjs";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";
 
export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow" },
  async ({ event, step }) => { 
  const workflowId = event.data.workflowId;
  if(!workflowId){
    throw new NonRetriableError("Workflow ID is missing")
  }
  const nodes = await step.run("prepare-workflow", async () => {
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
  return {nodes};
  },
  
);