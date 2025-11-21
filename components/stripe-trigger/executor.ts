import { NodeExecutor } from "@/features/executions/types";
import Handlebars from 'handlebars'
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";

Handlebars.registerHelper("json",(context) => new Handlebars.SafeString(JSON.stringify(context,null,2)))

export const StripeTriggerExecutor: NodeExecutor = async ({data,nodeId, step, context, publish}) => {

    await publish(
        stripeTriggerChannel().status({
            nodeId: nodeId,
            status: "loading"
        })
    )
    try{
    const result = await step.run("stripe trigger", async () => context)
await publish(
    stripeTriggerChannel().status({
        nodeId: nodeId,
        status: "success"
    })
)
return result
    }
    catch(error){
        await publish(stripeTriggerChannel().status({
            nodeId,
            status: "error"
        }))
        throw error
    }
}