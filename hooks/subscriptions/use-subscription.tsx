import { authClient } from "@/lib/auth-client"
import polarClient from "@/lib/polar"
import { useQuery } from "@tanstack/react-query"

export const useSubscription = () => {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            const {data} = await authClient.getSession();
            const customer = await polarClient.customers.getStateExternal(
                { externalId: data?.user.id || '' }
              );
            return customer;
        }
    })
}

export const useHasActiveSubscription = () => {
    const {data: customerState, isLoading, ...rest} = useSubscription();
    const hasActiveSubscription = customerState?.activeSubscriptions && customerState?.activeSubscriptions.length > 0;
    return {
        hasActiveSubscription,
        subscription: customerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest
    }
}