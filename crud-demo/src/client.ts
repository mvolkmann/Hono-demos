import {CreateType, DeleteType, GetAllType, UpdateType} from './dog-router';
import {hc} from 'hono/client';

const URL_PREFIX = 'http://localhost:3000/';

const createClient = hc<CreateType>(URL_PREFIX);
const deleteClient = hc<DeleteType>(URL_PREFIX);
const getAllClient = hc<GetAllType>(URL_PREFIX);
const updateClient = hc<UpdateType>(URL_PREFIX);

async function demo() {
  // Create a dog.
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

  // Update a dog.
  res = await updateClient.dog[':id'].$put({
    param: {id: 1},
    json: {
      // id: 1,
      name: 'Fireball',
      breed: 'Greyhound'
    }
  });

  // Delete a dog.
  res = await deleteClient.dog[':id'].$delete({param: {id: 2}});

  // Get all the dogs.
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
}

demo();
