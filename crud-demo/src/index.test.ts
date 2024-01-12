import {describe, expect, it} from 'bun:test';
import app from '.';

const comet = {id: 1, name: 'Comet', breed: 'Whippet'};

const URL_PREFIX = 'http://localhost:3000/dog';

async function getAllDogs() {
  const req = new Request(URL_PREFIX);
  req.headers.set('Accept', 'application/json');
  const res = await app.fetch(req);
  return res.json();
}

async function getDogById(id: number) {
  const req = new Request(`${URL_PREFIX}/${id}`);
  const res = await app.fetch(req);
  return res.status === 200 ? res.json() : undefined;
}

describe('dog endpoints', () => {
  it('should get all dogs', async () => {
    const dogs = await getAllDogs();
    expect(Object.keys(dogs).length).toBe(2);
    expect(dogs[1]).toEqual(comet);
  });

  it('should get one dog', async () => {
    const req = new Request(URL_PREFIX + '/1');
    const res = await app.fetch(req);
    const dog = await res.json();
    expect(dog).toEqual(comet);
    expect(res.status).toBe(200);
  });

  it('should add a dog', async () => {
    const dog = {
      name: 'Ramsay',
      breed: 'Native American Indian Dog'
    };
    const req = new Request(URL_PREFIX, {
      method: 'POST',
      body: JSON.stringify(dog)
    });
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    const newDog = await res.json();

    // Verify that the dog was added.
    const dogs = await getAllDogs();
    const foundDog = dogs[newDog.id];
    expect(newDog.name).toBe(foundDog.name);
    expect(newDog.breed).toBe(foundDog.breed);
  });

  it('should update a dog', async () => {
    const dog = {
      name: 'Fireball',
      breed: 'Greyhound'
    };
    const req = new Request(URL_PREFIX + '/1', {
      method: 'PUT',
      body: JSON.stringify(dog)
    });
    const res = await app.fetch(req);

    expect(res.status).toBe(200);
    const updatedDog = await res.json();
    expect(updatedDog.name).toBe(dog.name);
    expect(updatedDog.breed).toBe(dog.breed);

    // Verify that the dog was updated.
    const dogs = await getAllDogs();
    const foundDog = dogs[updatedDog.id];
    expect(updatedDog.name).toBe(foundDog.name);
    expect(updatedDog.breed).toBe(foundDog.breed);
  });

  it('should delete a dog', async () => {
    const id = 1;
    const req = new Request(`${URL_PREFIX}/${id}`, {
      method: 'DELETE'
    });
    const res = await app.fetch(req);

    expect(res.status).toBe(200);

    // Verify that the dog was deleted.
    const dog = await getDogById(id);
    expect(dog).toBeUndefined();
    const dogs = await getAllDogs();
    expect(dogs[id]).toBeUndefined();
  });
});
