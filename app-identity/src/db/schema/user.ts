import { boolean, date, integer, pgEnum } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const typeEnum = pgEnum('type', ['CUSTOMER', 'COMPANY']);

export const users = pgTable('users', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    type: typeEnum('type').notNull(), //
    password: text("password_hash").notNull(),
    createdAt: date({ mode: 'date' }).defaultNow(),
    updatedAt: date({ mode: 'date' }).defaultNow(),
    isActive: boolean("is_active").notNull().default(true),
})