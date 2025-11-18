import { NodeExecutor } from "@/features/executions/types";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

type ManualTriggerData = Record<string,unknown>
export const ManualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({nodeId, step, context,publish}) => {
    await publish(
        manualTriggerChannel().status({
            nodeId: nodeId,
            status: "loading"
        })
    )
    const result = await step.run("manual trigger", async () => context)
    await publish(
        manualTriggerChannel().status({
            nodeId: nodeId,
            status: "success"
        })
    )
    return result
}