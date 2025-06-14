import { date, integer } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { users } from './user.ts'

export const customers = pgTable('customers', {
  id: text().primaryKey(),
  name: text().notNull(),
  phone: text().notNull(),
  document: text().notNull(),
  user_id: text('user_id').notNull().references(() => users.id),
  createdAt: date({ mode: 'date' }).defaultNow(),
})