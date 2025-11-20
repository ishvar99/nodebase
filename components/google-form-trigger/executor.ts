import { NodeExecutor } from "@/features/executions/types";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

type GoogleFormTriggerData = Record<string,unknown>
export const GoogleFormTriggerExecutor: NodeExecutor<GoogleFormTriggerData> = async ({nodeId, step, context,publish}) => {
    await publish(
        googleFormTriggerChannel().status({
            nodeId: nodeId,
            status: "loading"
        })
    )
    const result = await step.run("google form trigger", async () => context)
    await publish(
        googleFormTriggerChannel().status({
            nodeId: nodeId,
            status: "success"
        })
    )
    return result
}