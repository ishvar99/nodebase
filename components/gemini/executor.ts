import { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, {Options as KyOptions} from 'ky'
import Handlebars from 'handlebars'
import { httpRequestChannel } from "@/inngest/channels/http-request";
import { geminiChannel } from "@/inngest/channels/gemini";

Handlebars.registerHelper("json",(context) => new Handlebars.SafeString(JSON.stringify(context,null,2)))

type GeminiData = {
    variableName?: string;
    model?: any;
    systemPrompt?: string;
    userPrompt?: string;
}
export const GeminiExecutor: NodeExecutor<GeminiData> = async ({data,nodeId, step, context, publish}) => {

    await publish(
        geminiChannel().status({
            nodeId: nodeId,
            status: "loading"
        })
    )
   
}