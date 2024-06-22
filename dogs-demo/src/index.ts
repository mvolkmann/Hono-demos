import {type Context, Hono} from 'hono';
import {serveStatic} from 'hono/bun';
import dogRouter from './dog-router';

const app = new Hono();

// This serves static files from the public directory.
app.use('/*', serveStatic({root: './public'}));

app.get('/', (c: Context) => c.redirect('/dogs'));

app.route('/dog', dogRouter);

export default app;
