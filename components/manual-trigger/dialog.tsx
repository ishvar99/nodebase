'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

interface ManualTriggerDialogProps {
    open :boolean;
    onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({open,onOpenChange}: ManualTriggerDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manual Trigger</DialogTitle>
                    <DialogDescription>
                        Configure settings for the manual trigger node.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}