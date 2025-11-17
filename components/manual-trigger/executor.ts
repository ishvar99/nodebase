import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string,unknown>
export const ManualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({nodeId, step, context}) => {
    const result = await step.run("manual trigger", async () => context)
    return result
}