import { prisma } from "@/prisma/db";
import {generateSlug} from "random-word-slugs"
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(({ctx}: any) => {
        return prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id
            }
        })
    }),
    remove: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(({ctx,input}: any)=>{
        return prisma.workflow.delete({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            }
        })
    }),
    update: protectedProcedure
    .input(z.object({id: z.string(), name: z.string().min(1)}))
    .mutation(({ctx,input}: any)=>{
        return prisma.workflow.update({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            },
            data: {
                name: input.name
            }
        })
    }),
    getOne: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(({ctx,input}: any)=>{
        return prisma.workflow.findUnique({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            }
        })
    }),
    getMany: protectedProcedure
    .query(({ctx}: any)=>{
        return prisma.workflow.findMany({
            where: {
                userId: ctx.auth.user.id
            }
        })
    }),
})