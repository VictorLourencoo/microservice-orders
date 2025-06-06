import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {z} from 'zod'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { db } from '../db/client_connect.ts'
import { schema } from '../db/schema/index.ts'
import { dispachOrderCreatedMessage } from '../broker/messages/order_created.ts'


const app = fastify().withTypeProvider<ZodTypeProvider>()   
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {origin: '*'})

app.get('/health', async (request, reply) => {
    return reply.status(200).send({
        status: 'ok',
        timestamp: new Date().toISOString(),
    })
}) 


app.post('/orders', {
    schema: {
        body: z.object({
            amount: z.number().min(1),
        }),
    }
}, async (request, reply) => {
    const { amount } = request.body
    console.log('Received order with amount:', amount)
    const orderId = crypto.randomUUID()

    dispachOrderCreatedMessage({
        orderId,
        amount,
        status: 'pending',
        customer: {
            id: "2529668c-d291-4047-a5bb-2ce22b2ab010",
        }
    })

    await db.insert(schema.orders).values({
    id: orderId,
    customerId: "2529668c-d291-4047-a5bb-2ce22b2ab010",
    status: 'pending',
    amount
    })
    return reply.status(201).send()
})


app.listen({host: '0.0.0.0', port: 3333}).then(() => {
    console.log('Server is running on http://localhost:3333')
})
