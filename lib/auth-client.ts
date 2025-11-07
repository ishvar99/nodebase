import { polarClient } from "@polar-sh/better-auth"
import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    plugins: [
        nextCookies(),
        polarClient()
    ]
})