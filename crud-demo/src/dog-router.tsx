import {Hono, type Context} from 'hono';
import type {FC} from 'hono/jsx';

const router = new Hono();

interface NewDog {
  name: string;
  breed: string;
}

interface Dog extends NewDog {
  id: number;
}

let lastId = 0;
const dogMap: {[id: number]: Dog} = {};

function addDog(name: string, breed: string): Dog {
  const id = ++lastId;
  const dog = {id, name, breed};
  dogMap[id] = dog;
  return dog;
}

addDog('Comet', 'Whippet');
addDog('Oscar', 'German Shorthaired Pointer');

const Layout: FC = props => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <title>{props.title}</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const DogPage: FC = ({dogs}) => {
  const title = 'Dogs I Know';
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <ul>
        {dogs.map((dog: Dog) => (
          <li>
            {dog.name} is a {dog.breed}.
          </li>
        ))}
      </ul>
    </Layout>
  );
};

router.get('/', (c: Context) => {
  const accept = c.req.header('Accept');
  if (accept && accept.includes('application/json')) {
    return c.json(dogMap);
  }

  const dogs = Object.values(dogMap).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return c.html(<DogPage dogs={dogs} />);
});

router.get('/:id', (c: Context) => {
  const id = Number(c.req.param('id'));
  const dog = dogMap[id];
  c.status(dog ? 200 : 404);
  return c.json(dog);
});

router.post('/', async (c: Context) => {
  console.log('dog-router.tsx post: entered');
  const data = (await c.req.json()) as unknown as NewDog;
  console.log('dog-router.tsx post: data =', data);
  const dog = addDog(data.name, data.breed);
  return c.json(dog);
});

router.put('/:id', async (c: Context) => {
  const id = Number(c.req.param('id'));
  const data = (await c.req.json()) as unknown as NewDog;
  const dog = dogMap[id];
  if (dog) {
    dog.name = data.name;
    dog.breed = data.breed;
  }
  c.status(dog ? 200 : 404);
  return c.json(dog);
});

router.delete('/:id', async (c: Context) => {
  const id = Number(c.req.param('id'));
  const dog = dogMap[id];
  if (dog) delete dogMap[id];
  c.status(dog ? 200 : 404);
  return c.text('');
});

export default router;
