import type { FastifyInstance } from 'fastify'
import { CreateOrderSchema, CreateOrderHandle } from './create-order.ts'

export function OrdersRoutes(app: FastifyInstance) {
  app.post('/orders', CreateOrderSchema, CreateOrderHandle)
}
