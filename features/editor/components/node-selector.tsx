'use client'

import {createId} from "@paralleldrive/cuid2"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { NodeType } from "@/lib/generated/prisma/enums"
import { GlobeIcon, MousePointerIcon } from "lucide-react"
import React from "react"


export type NodeTypeOption = {
    type: NodeType,
    label: string,
    description: string,
    icon: React.ComponentType<{className?: string}> | string;

}

const executionNodes: NodeTypeOption[] = [
    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Makes an HTTP Request",
        icon: GlobeIcon
    }
]


const triggerNodes: NodeTypeOption[] = [
    {
        type: NodeType.MANUAL_TRIGGER,
        label: "Trigger manually",
        description: "Runs the flow on clicking a button. Good for getting started quickly",
        icon: MousePointerIcon
    }
]


interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode
}

export function NodeSelector({
    open,
    onOpenChange,
    children
}: NodeSelectorProps){
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
                <SheetTitle>
                    What triggers this workflow?
                </SheetTitle>
                <SheetDescription>
                    A trigger is a step that starts your workflow.
                </SheetDescription>
                </SheetHeader>
                    <div>
                        {triggerNodes.map((nodeType) => {
                           const Icon =nodeType.icon 
                           return (
                            <div key={nodeType.type}
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                            onClick={()=>{}}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === "string" ? (
                                        <img
                                            src={Icon}
                                            alt={nodeType.label}
                                            className="size-5 object-contain rounded-sm"
                                        />
                                    ) : (
                                        <Icon className="size-5"/>
                                    )
                                }
                                    </div>
                                </div>
                           )
                        })}
                    </div>
        </SheetContent>
        </Sheet>
    )
}