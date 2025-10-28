import { cn } from "@/lib/utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  const users = await caller.getUsers()
  return (
<div className={cn("text-red-500 font-bold")}>
  {JSON.stringify(users)}
</div>
  );
}
