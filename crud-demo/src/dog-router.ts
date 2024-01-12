import {Hono, type Context} from 'hono';

const router = new Hono();

interface NewDog {
  name: string;
  breed: string;
}

interface Dog extends NewDog {
  id: number;
}

let lastId = 0;
const dogs: {[id: number]: Dog} = {};

function addDog(name: string, breed: string): Dog {
  const id = ++lastId;
  const dog = {id, name, breed};
  dogs[id] = dog;
  return dog;
}

addDog('Comet', 'Whippet');
addDog('Oscar', 'German Shorthaired Pointer');

router.get('/', (c: Context) => {
  // TODO: Check the accept header and return HTML if requested.
  // const list = Object.values(dogs).sort((a, b) => a.name.localeCompare(b.name));
  // console.log('index.ts html: list =', list);
  /*
  return c.html(
    <ul>
      {list.map(dog => (
        <li>
          {dog.name} is a {dog.breed}.
        </li>
      ))}
    </ul>
  );
  */
  // return c.html('<h1>hello</h1>');

  return c.json(dogs);
});

router.get('/:id', (c: Context) => {
  const id = Number(c.req.param('id'));
  const dog = dogs[id];
  c.status(dog ? 200 : 404);
  return c.json(dog);
});

router.post('/', async (c: Context) => {
  const data = (await c.req.json()) as unknown as NewDog;
  const dog = addDog(data.name, data.breed);
  return c.json(dog);
});

router.put('/:id', async (c: Context) => {
  const id = Number(c.req.param('id'));
  const data = (await c.req.json()) as unknown as NewDog;
  const dog = dogs[id];
  if (dog) {
    dog.name = data.name;
    dog.breed = data.breed;
  }
  c.status(dog ? 200 : 404);
  return c.json(dog);
});

router.delete('/:id', async (c: Context) => {
  const id = Number(c.req.param('id'));
  const dog = dogs[id];
  if (dog) delete dogs[id];
  c.status(dog ? 200 : 404);
  return c.text('');
});

export default router;
