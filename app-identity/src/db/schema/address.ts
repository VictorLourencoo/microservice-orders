import { date, integer } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { typeEnum } from './user.ts'

export const address = pgTable('address', {
    id: text().primaryKey(),
    userId: text().notNull(), // Assuming this is a foreign key to a users table
    street: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
    zipCode: text().notNull(),
    country: text().notNull(),
    ownerId: integer('owner_id').notNull(),         // ID do cliente ou da empresa
    ownerType: typeEnum('owner_type').notNull(), 
    createdAt: date({ mode: 'date' }).defaultNow(),
    updatedAt: date({ mode: 'date' }).defaultNow(),
})