import {describe, expect, it} from 'bun:test';
import app from '.';

const comet = {id: 1, name: 'Comet', breed: 'Whippet'};

describe('dog endpoints', () => {
  it('should get all dogs', async () => {
    const req = new Request('http://localhost/dog');
    const res = await app.fetch(req);
    const dogs = await res.json();
    expect(Object.keys(dogs).length).toBe(2);
    expect(dogs[1]).toEqual(comet);
    expect(res.status).toBe(200);
  });

  it('should get one dog', async () => {
    const req = new Request('http://localhost/dog/1');
    const res = await app.fetch(req);
    const dog = await res.json();
    expect(dog).toEqual(comet);
    expect(res.status).toBe(200);
  });
});
