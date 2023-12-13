import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const pokemon = pgTable('pokemon', {
	id: serial('id').primaryKey().notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	sprite: varchar('sprite', { length: 255 }).notNull()
});

export const itemSprites = pgTable('itemSprites', {
	id: serial('id').primaryKey().notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	sprite: varchar('sprite', { length: 255 }).notNull()
});
