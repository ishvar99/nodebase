import { HttpRequestExecutor } from "@/components/http-request/executor";
import { ManualTriggerExecutor } from "@/components/manual-trigger/executor";
import { NodeExecutor } from "@/features/executions/types";
import { NodeType } from "@/lib/generated/prisma/enums";

export const executorRegistry : Record<NodeType, NodeExecutor> = {
    [NodeType.MANUAL_TRIGGER]: ManualTriggerExecutor,
    [NodeType.HTTP_REQUEST]: HttpRequestExecutor,
    [NodeType.INITIAL]: ManualTriggerExecutor
}

export const getExecutor = (type:NodeType): NodeExecutor => {
    const executor = executorRegistry[type]
    if(!executor){
        throw new Error(`No executor found for node type ${type}`)
    }
    return executor
}