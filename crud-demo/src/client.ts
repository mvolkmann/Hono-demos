import {GetAllType, UpdateType} from './dog-router';
import {hc} from 'hono/client';

const URL_PREFIX = 'http://localhost:3000/dog';

const getAllClient = hc<GetAllType>(URL_PREFIX);

async function demo() {
  const dogs = await getAllClient.$get(
    {},
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  console.log('client.ts demo: dogs =', dogs);

  /*
  const res = await client.dogs.$put({
    id: 1,
    name: 'Fireball',
    breed: 'Greyhound'
  });
  */
}

demo();
