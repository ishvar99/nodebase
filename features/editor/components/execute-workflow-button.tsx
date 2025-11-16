import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/hooks/workflows/use-workflows";
import { FlaskConicalIcon} from "lucide-react";

 
export const ExecuteWorkflowButton = ({workflowId}: {workflowId: string}) => {
    const executeWorkflow = useExecuteWorkflow();

    const handleExecute = () => {
        executeWorkflow.mutate({id: workflowId})
    }
    return (
        <Button
        onClick={handleExecute}
        disabled={executeWorkflow.isPending}
        >
            <FlaskConicalIcon className="size-4"/>
            Execute workflow
        </Button>
    )
}

ExecuteWorkflowButton.displayName = "ExecuteWorkflowButton"