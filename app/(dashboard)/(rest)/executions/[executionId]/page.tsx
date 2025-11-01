interface PageProps {
    params: Promise<{
        executionId: string
    }>
}

const Page = async ({params}: PageProps) => {
    const {executionId} = await params;
    return <p>ExecutionId Id: {executionId}</p>
}

export default Page