import {Hono, type Context} from 'hono';
import {serveStatic} from 'hono/bun';

type Dog = {
  id: number;
  name: string;
  breed: string;
};

const dogs: {[id: number]: Dog} = {
  1: {id: 1, name: 'Comet', breed: 'Whippet'},
  2: {id: 2, name: 'Oscar', breed: 'German Shorthaired Pointer'}
};

const app = new Hono();

app.use('/*', serveStatic({root: './public'}));

app.get('/dog', (c: Context) => {
  return c.json(dogs);
});

app.get('/dog/:id', (c: Context) => {
  const id = Number(c.req.param('id'));
  const dog = dogs[id];
  c.status(dog ? 200 : 404);
  return c.json(dog);
});

/*
app.post('/dog', (c: Context) => {
  // const dog = c.body;
  // console.log('index.ts post: dog =', dog);
  c.text('demo');
});
*/

export default app;
