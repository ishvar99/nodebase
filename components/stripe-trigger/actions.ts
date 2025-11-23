'use server'

import { getSubscriptionToken, type Realtime } from "@inngest/realtime"
import {inngest} from "@/inngest/client"
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger"

export type StripeTriggerAccessToken = Realtime.Token<typeof stripeTriggerChannel, ["status"]>

export async function fetchStripeTriggerRealtimeToken(): Promise<StripeTriggerAccessToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: stripeTriggerChannel(),
        topics: ["status"]
    })
    return token
}