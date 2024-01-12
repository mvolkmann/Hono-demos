import {Hono, type Context} from 'hono';
import {serveStatic} from 'hono/bun';
import dogRouter from './dog-router';

const app = new Hono();

// Try browsing http://localhost:3000/demo.html
app.use('/*', serveStatic({root: './public'}));

app.route('/dog', dogRouter);

export default app;
