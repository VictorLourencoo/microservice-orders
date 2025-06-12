import type { FastifyInstance } from 'fastify'
import { OrdersRoutes } from './orders/index.ts'

export function Routes(app: FastifyInstance) {
 return OrdersRoutes(app)
}
