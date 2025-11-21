'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm } from 'react-hook-form';
import z from 'zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectItem } from '../ui/select';
import { SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { CopyIcon } from 'lucide-react';


interface StripeDialogProps {
    open :boolean;
    onOpenChange: (open: boolean) => void;
}

export const StripeDialog = ({open,onOpenChange}: StripeDialogProps) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

    const copyToClipboard = async () => {
        try{
            await navigator.clipboard.writeText(webhookUrl)
            toast.success("Webhook URL copied to clipboard")
        }
        catch{
            toast.error("Failed to copy URL")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Stripe Trigger Configuration</DialogTitle>
                    <DialogDescription>
                        Configure this webhook URL in your Stripe Dashboard to trigger this workflow on payment events.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className='space-y-2'>
                        <label htmlFor='webhook-url'>
                        Webhook URL
                        </label>
                        <div className='flex gap-4'>
                        <Input id="webhook-url" value={webhookUrl} readOnly className='font-mono text-sm'/>
                        <Button type="button" size="icon" variant={"outline"} onClick={copyToClipboard}>
                            <CopyIcon className='size-4'/>
                        </Button>
                        </div>
                    </div>
                   </div> 
                   <div className='rounded-lg bg-muted p-4 space-y-2'>
                    <h4 className='font-medium text-sm'>Setup instructions:</h4>
                    <ol className='text-sm text-muted-foreground space-y-1 list-decimal list-inside'>
                        <li>Open your Stripe Dashboard</li>
                        <li>Go to developers → Webhooks</li>
                        <li>Click "Add endpoint"</li>
                        <li>Paste the webhook URL above</li>
                        <li>Select events to listen for (e.g., payment_intent.succeeded) </li>
                        <li>Save and copy the signing secret</li>
                    </ol>
                   </div>
                   <div className='rounded-lg bg-muted p-4 space-y-2'>
                        <h4 className='font-medium text-sm'>Available Variables</h4>
                        <ul className='text-sm text-muted-foreground space-y-1'>
                           <li>
                            <code className='bg-background px-1 py-0.5 rounded'>
                                {"{{stripe.amount}}"} 
                            </code>
                            - Payment amount
                           </li>
                           <li>
                            <code className='bg-background px-1 py-0.5 rounded'>
                                {"{{stripe.currency}}"}
                            </code> - Curreny code
                           </li>
                           <li>
                            <code className='bg-background px-1 py-0.5 rounded'>
                                {"{{stripe.customerId}}"}
                            </code> - Customer ID
                           </li>
                           <li>
                            <code className='bg-background px-1 py-0.5 rounded'>
                                {"{{json stripe}}"}
                            </code> - Full event data as JSON
                           </li>
                           <li>
                            <code className='bg-background px-1 py-0.5 rounded'>
                                {"{{stripe.eventType}}"}
                            </code> - Event type (e.g., payment_intent.succeeded)
                           </li>
                        </ul>
                   </div>
            </DialogContent>
        </Dialog>
    )
}