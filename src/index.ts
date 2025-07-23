import "dotenv/config";
import { eq } from 'drizzle-orm';
import { Hono } from 'hono'
import { users } from './db/schema';
import db from './db';
import { bearerAuth } from "hono/bearer-auth";
import { env } from "hono/adapter";
const app = new Hono()

app.use(
    "/*",
    bearerAuth({
      verifyToken: async (token, c) => {
        const { SECRET_PASSWORD } = env<{ SECRET_PASSWORD: string }>(c);
        return token === SECRET_PASSWORD;
      },
    })
  );

app.get("/", async (c) => {
    const users = await db.query.users.findMany()
    return c.json(users)
});

app.get("/:id", async (c) => {
    const id = c.req.param('id')
    const user = await db.query.users.findFirst({
        where: eq(users.id, Number(id))
    })
    return c.json(user)
})

app.post('/', async (c) => {
    const { firstname, lastname, std_id, dob, sex } = await c.req.json()
    const user = await db.insert(users).values({
        firstname,
        lastname,
        std_id,
        dob,
        sex
    })
    return c.json(user)
})

app.put('/:id', async (c) => {
    const id = c.req.param('id')
    const { firstname, lastname, std_id, dob, sex } = await c.req.json()
    const user = await db.update(users).set({
        firstname,
        lastname,
        std_id,
        dob,
        sex
    }).where(eq(users.id, Number(id)))
    return c.json(user)
})

app.delete('/:id', async (c) => {
    const id = c.req.param('id')
    const user = await db.delete(users).where(eq(users.id, Number(id)))
    return c.json(user)
})

export default app