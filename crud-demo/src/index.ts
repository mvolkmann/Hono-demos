import { Hono } from "hono";

const app = new Hono();

type Dog = {
  id: number;
  name: string;
  breed: string;
};

const dogs: { [id: number]: Dog } = {
  1: { id: 1, name: "Comet", breed: "Whippet" },
  2: { id: 2, name: "Oscar", breed: "German Shorthaired Pointer" },
};

app.get("/dog", (c) => {
  return c.json(dogs);
});

app.get("/dog/:id", (c) => {
  const id = Number(c.req.param("id"));
  const dog = dogs[id];
  c.status(dog ? 200 : 404);
  return c.json(dog);
});

export default app;
