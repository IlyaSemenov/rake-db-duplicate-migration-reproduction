import { createBaseTable } from 'orchid-orm'
import { rakeDb } from 'rake-db'

export const change = rakeDb(
	{ databaseURL: 'postgres://localhost/test' },
	{
		baseTable: createBaseTable(),
		migrationsPath: './migrations',
		migrationsTable: 'rakedb_migration',
		import: path => import(path),
	},
)

await change.promise
