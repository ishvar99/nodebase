import { prisma } from "@/prisma/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {createOpenAI}  from "@ai-sdk/openai";
import {createAnthropic}  from "@ai-sdk/anthropic";
import { generateText } from 'ai';

const google = createGoogleGenerativeAI()
const openAI = createOpenAI()
const anthropic = createAnthropic()
export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => { 
            const {steps: geminiSteps} = await step.ai.wrap("genemi-generate-text",
                generateText, 
                {
                    model: google("gemini-2.5-flash"),
                    prompt: "what is 2 + 2 ?"
                }
            )

            const {steps: openaiSteps} = await step.ai.wrap("openai-generate-text",
            generateText, 
            {
                model: openAI("gpt-3.5-turbo"),
                prompt: "what is 2 + 2 ?"
            }
        )
     
        const {steps: anthropicSteps} = await step.ai.wrap("anthropic-generate-text",
        generateText, 
        {
            model: anthropic("claude-3-5-haiku-20241022"),
            prompt: "what is 2 + 2 ?"
        }
    )
    return {
        geminiSteps,
        openaiSteps,
        anthropicSteps
    };
  },
  
);