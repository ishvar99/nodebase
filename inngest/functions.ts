import { prisma } from "@/prisma/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {createOpenAI}  from "@ai-sdk/openai";
import {createAnthropic}  from "@ai-sdk/anthropic";
import { generateText } from 'ai';
import * as Sentry from "@sentry/nextjs";

const google = createGoogleGenerativeAI()
const openAI = createOpenAI()
const anthropic = createAnthropic()
export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => { 
    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })
            console.error("This is an error i want to track")
            const {steps: geminiSteps} = await step.ai.wrap("genemi-generate-text",
                generateText, 
                {
                    model: google("gemini-2.5-flash"),
                    prompt: "what is 2 + 2 ?",
                    experimental_telemetry: {
                        isEnabled: true,
                        recordInputs: true,
                        recordOutputs: true
                    }
                }
            )

            const {steps: openaiSteps} = await step.ai.wrap("openai-generate-text",
            generateText, 
            {
                model: openAI("gpt-3.5-turbo"),
                prompt: "what is 2 + 2 ?",
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true
                }
            }
        )
     
        const {steps: anthropicSteps} = await step.ai.wrap("anthropic-generate-text",
        generateText, 
        {
            model: anthropic("claude-3-5-haiku-20241022"),
            prompt: "what is 2 + 2 ?",
            experimental_telemetry: {
                isEnabled: true,
                recordInputs: true,
                recordOutputs: true
            }
        }
    )
    return {
        geminiSteps,
        openaiSteps,
        anthropicSteps
    };
  },
  
);