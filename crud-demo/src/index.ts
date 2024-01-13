import {Hono} from 'hono';
// import {LinearRouter} from 'hono/router/linear-router';
import {serveStatic} from 'hono/bun';
import {logger} from 'hono/logger';
import dogRouter from './dog-router';

const app = new Hono();
// This demonstrates selecting a router other than the default.
// const app = new Hono({router: new LinearRouter()});

// This logs all HTTP requests to the terminal where the server is running.
app.use('/*', logger());

// This serves static files from the public directory.
// Try browsing http://localhost:3000/demo.html
app.use('/*', serveStatic({root: './public'}));

app.route('/dog', dogRouter);

export default app;
