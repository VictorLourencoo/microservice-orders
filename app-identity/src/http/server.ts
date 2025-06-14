import '@opentelemetry/auto-instrumentations-node/register'

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'

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

app.listen({host: '0.0.0.0', port: 3000}).then(() => {
    console.log('[IDENTITY] Server is running on http://localhost:3000')
})
