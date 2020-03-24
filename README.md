# Node-Postgres-Typescript

* Install + start with `yarn` and `yarn start`
* Develop locally with postgres using `docker-compose up`
* Create fixtures with `node migrate create [TABLE]`
* Build production image with `docker build -t [NAME] .`
* Add Typed routes to your API in `./src/routes.ts`
* Add JSON Schema body validation (see `./src/schemas`, `package.json` and `src/routes/ping.ts`)
* Integrate JWT in `./middleware/jwt-mock.ts`


## Database
The database is available on the app context:

```typescript
import { sql } from 'slonik';

const myRoute: RouteMiddleware = async ctx => { 
  const thing = await ctx.connection.one(
    sql`
      SELECT * FROM my_table
    `
  );

  ctx.response.status = 200;
  ctx.response.body = thing;
}

```

Use template literals to replace values – these are not concatenated and safe to use.
```typescript
const myRoute: RouteMiddleware = async ctx => { 
  const thing = await ctx.connection.one(
    sql`
      SELECT * FROM my_table 
      WHERE id = ${ctx.params.id}
    `
  );
  // ...
}
```

Use generics to specify return DB type.

```typescript

type MyThing = {
  id: string;
  count: number;
};

const myRoute: RouteMiddleware = async ctx => { 
  const thing = await ctx.connection.one<MyThing>(
    sql`
      SELECT * FROM my_table 
      WHERE id = ${ctx.params.id}
    `
  );

  thing.id; // string
  thing.count; // number

  // ...
}
```

Combine with JSON schema validation:
_Note: need to generate the json schema (see package.json for example)_
```typescript
// File: `schemas/task.ts`
type CreateTask = {
  name: string;
}

// File: `router.ts`
export const router = new TypedRouter({
  'create-task': [TypedRouter.POST, '/task', createTask, 'task'],
});

// File: `app.ts:21`
app.context.ajv = new Ajv();
app.context.ajv.addSchema(require('../schemas/task.json'), 'task');

// File: `routes/create-task.ts`
export const createTask: RouteMiddleware<{}, CreateTask> = async (context, next) => {
    // The request body IS of type CreateTask at this point from user input. 
    const task = context.requestBody;
};
```
