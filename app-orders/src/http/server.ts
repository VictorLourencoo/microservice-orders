import '@opentelemetry/auto-instrumentations-node/register'

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {z} from 'zod'
import { trace } from "@opentelemetry/api"
import { setTimeout } from 'node:timers/promises'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { db } from '../db/client_connect.ts'
import { schema } from '../db/schema/index.ts'
import { dispachOrderCreatedMessage } from '../broker/messages/order_created.ts'
import { tracer } from '../trace/trace.ts'
import { Routes } from './routes.ts'


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

Routes(app)
app.listen({host: '0.0.0.0', port: 3333}).then(() => {
    console.log('Server is running on http://localhost:3333')
})
