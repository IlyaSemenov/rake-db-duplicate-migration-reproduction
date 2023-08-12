## Reproduction

```sh
pnpm i
```

Then run:

```
/tmp/rake-db-duplicate-migration-reproduction master
❯ pnpm db drop; pnpm db create; pnpm db migrate

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake "drop"

Database test does not exist

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake "create"

Database test successfully created
Created versions table

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake "migrate"

Migrated file:///private/tmp/rake-db-duplicate-migration-reproduction/migrations/20230811075433_init.ts
migration module
migration change up=true
Migrated file:///private/tmp/rake-db-duplicate-migration-reproduction/migrations/20230811075433_init.ts

/tmp/rake-db-duplicate-migration-reproduction master
❯ psql test
psql (15.3 (Homebrew))
Type "help" for help.

test=# select * from rakedb_migration ;
    version
----------------
 20230811075433
 20230811075433
(2 rows)

test=#
\q

/tmp/rake-db-duplicate-migration-reproduction master 12s
❯ pnpm db reset

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake "reset"

Database test was successfully dropped
Database test successfully created
Created versions table
/private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/pg@8.11.2/node_modules/pg/lib/client.js:526
          Error.captureStackTrace(err);
                ^

error: database "test" is being accessed by other users
    at /private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/pg@8.11.2/node_modules/pg/lib/client.js:526:17
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at performQuery$1 (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/pqb@0.17.9/node_modules/pqb/src/adapter.ts:167:12)
    at execute (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/rake-db@2.10.24/node_modules/rake-db/src/commands/createOrDrop.ts:21:11)
    at createOrDrop (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/rake-db@2.10.24/node_modules/rake-db/src/commands/createOrDrop.ts:62:18)
    at dropDb (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/rake-db@2.10.24/node_modules/rake-db/src/commands/createOrDrop.ts:152:11)
    at resetDb (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/rake-db@2.10.24/node_modules/rake-db/src/commands/createOrDrop.ts:170:9)
    at runCommand (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/rake-db@2.10.24/node_modules/rake-db/src/rakeDb.ts:43:13)
    at /private/tmp/rake-db-duplicate-migration-reproduction/rake.ts:14:1
    at ViteNodeRunner.runModule (file:///private/tmp/rake-db-duplicate-migration-reproduction/node_modules/.pnpm/vite-node@0.34.1/node_modules/vite-node/dist/client.mjs:341:5) {
  length: 150,
  severity: 'ERROR',
  code: '55006',
  detail: 'There is 1 other session using the database.',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'dbcommands.c',
  line: '1629',
  routine: 'dropdb'
}
```

## Workaround

Change `vite-node --script ./rake` to `vite-node --script ./rake.ts`

Then everything works:

```
/tmp/rake-db-duplicate-migration-reproduction master 8s
❯ pnpm db drop; pnpm db create; pnpm db migrate

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake.ts "drop"

Database test was successfully dropped

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake.ts "create"

Database test successfully created
Created versions table

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake.ts "migrate"

migration module
migration change up=true
Migrated file:///private/tmp/rake-db-duplicate-migration-reproduction/migrations/20230811075433_init.ts

/tmp/rake-db-duplicate-migration-reproduction master*
❯ psql test
psql (15.3 (Homebrew))
Type "help" for help.

test=# select * from rakedb_migration ;
    version
----------------
 20230811075433
(1 row)

test=#
\q

/tmp/rake-db-duplicate-migration-reproduction master*
❯ pnpm db reset

> @ db /private/tmp/rake-db-duplicate-migration-reproduction
> vite-node --script ./rake.ts "reset"

Database test was successfully dropped
Database test successfully created
Created versions table
migration module
migration change up=true
Migrated file:///private/tmp/rake-db-duplicate-migration-reproduction/migrations/20230811075433_init.ts
```
