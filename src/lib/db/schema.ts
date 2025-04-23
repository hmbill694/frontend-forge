import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'


export const projects = sqliteTable('projects', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export type InsertProject = InferInsertModel<typeof projects>
export type SelectProject = InferSelectModel<typeof projects>

export const chats = sqliteTable('chats', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id')
		.notNull()
		.references(() => projects.id),
	message: text('message').notNull(),
	sender: text('sender', { enum: ['user', 'agent'] }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export type InsertChat = InferInsertModel<typeof chats>
export type SelectChat = InferSelectModel<typeof chats>

export const components = sqliteTable('components', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id')
		.notNull()
		.references(() => projects.id),
	name: text('name').notNull(),
	definition: text('definition').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export type InsertComponent = InferInsertModel<typeof components>
export type SelectComponent = InferSelectModel<typeof components>

export const pages = sqliteTable('generated_pages', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	content: text('content').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
	projectId: integer('project_id')
		.notNull()
		.references(() => projects.id),
})

export type InsertPage = InferInsertModel<typeof pages>
export type SelectPage = InferSelectModel<typeof pages>
