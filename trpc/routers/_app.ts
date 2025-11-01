import { prisma } from '@/prisma/db';
import {createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ctx}) => {
      return prisma.workflow.findMany()
    }),
  createWorkflow: protectedProcedure.mutation(async () => {
    return {success: true, message: 'job queued'}
  }),
  testAi: protectedProcedure.mutation(async() =>{
   await inngest.send({
    name: "execute/ai"
   })
   return {success: true, message: 'job queued'}
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;