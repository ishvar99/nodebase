import { GeminiExecutor } from "@/components/gemini/executor";
import { GoogleFormTriggerExecutor } from "@/components/google-form-trigger/executor";
import { HttpRequestExecutor } from "@/components/http-request/executor";
import { ManualTriggerExecutor } from "@/components/manual-trigger/executor";
import { StripeTriggerExecutor } from "@/components/stripe-trigger/executor";
import { NodeExecutor } from "@/features/executions/types";
import { NodeType } from "@/lib/generated/prisma/enums";

export const executorRegistry : Record<NodeType, NodeExecutor> = {
    [NodeType.MANUAL_TRIGGER]: ManualTriggerExecutor,
    [NodeType.HTTP_REQUEST]: HttpRequestExecutor,
    [NodeType.INITIAL]: ManualTriggerExecutor,
    [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerExecutor,
    [NodeType.STRIPE_TRIGGER]: StripeTriggerExecutor,
    [NodeType.GEMINI]: GeminiExecutor
}

export const getExecutor = (type:NodeType): NodeExecutor => {
    const executor = executorRegistry[type]
    if(!executor){
        throw new Error(`No executor found for node type ${type}`)
    }
    return executor
}