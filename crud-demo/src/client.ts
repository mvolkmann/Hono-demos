import {CreateType, DeleteType, GetAllType, UpdateType} from './dog-router';
import {hc} from 'hono/client';

const URL_PREFIX = 'http://localhost:3000/';

const createClient = hc<CreateType>(URL_PREFIX);
const deleteClient = hc<DeleteType>(URL_PREFIX);
const getAllClient = hc<GetAllType>(URL_PREFIX);
const updateClient = hc<UpdateType>(URL_PREFIX);

async function demo() {
  let res = await createClient.dog.$post(
    {
      json: {
        name: 'Ramsay',
        breed: 'Native American Indian Dog'
      }
    },
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );

  res = await getAllClient.dog.$get(
    {},
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  const dogs = await res.json();
  console.log('client.ts demo: dogs =', dogs);

  // TODO: Get this working.
  res = await updateClient.dogs.$put({
    id: 1,
    name: 'Fireball',
    breed: 'Greyhound'
  });

  // TODO: Get this working.
  res = await deleteClient.dogs.$put({
    id: 1,
    name: 'Fireball',
    breed: 'Greyhound'
  });
}

demo();
