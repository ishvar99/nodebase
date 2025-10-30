import { Client } from "@/components/home/client";
import { cn } from "@/lib/utils";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Home() {
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Suspense fallback={<p>...loading</p>}>
      <Client/>
  );
}
