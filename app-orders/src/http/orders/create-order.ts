import z from "zod"
import type { FastifyRequest, FastifyReply } from 'fastify'
import { schema } from "../../db/schema/index.ts"
import { db } from "../../db/client_connect.ts"
import { tracer } from "../../trace/trace.ts"
import { dispachOrderCreatedMessage } from "../../broker/messages/order_created.ts"

export async function CreateOrderHandle(request: FastifyRequest, response: FastifyReply) {
  try {
    

    const { amount } = request.body as {amount: number}
    console.log('Received order with amount:', amount)
    const orderId = crypto.randomUUID()

    await db.insert(schema.orders).values({
    id: orderId,
    customerId: "2529668c-d291-4047-a5bb-2ce22b2ab010",
    status: 'pending',
    amount
    })

    const span  = tracer.startSpan("aqui ta demorando")
    span.setAttribute('order_id', orderId)

    dispachOrderCreatedMessage({
        orderId,
        amount,
        status: 'pending',
        customer: {
            id: "2529668c-d291-4047-a5bb-2ce22b2ab010",
        }
    })

    return response.status(201).send()
      } catch (error) {
        console.error('Error creating order:', error)
  }
}


const createOrderBody = z.object({
    amount: z.number().min(1, { message: "Amount must be greater than 0" }),
})

export const CreateOrderSchema = {
  schema: {
    body: createOrderBody,
  },
}