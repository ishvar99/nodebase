import { Polar } from "@polar-sh/sdk";

const polarClient = new Polar({
    accessToken: process.env.NEXT_PUBLIC_POLAR_ACCESS_TOKEN,
    server: "sandbox"
});

export default polarClient