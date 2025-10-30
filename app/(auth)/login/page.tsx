import { LoginForm } from "@/components/login/login-form"
import { requireUnauth } from "@/lib/auth-utils"

const Page = async () => {
    await requireUnauth();
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Page