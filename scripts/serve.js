import { Application } from 'https://deno.land/x/abc/mod.ts';
import { cors } from 'https://deno.land/x/abc/middleware/cors.ts';

const BUILD_DIR = 'build';
const PORT = 5000;

const app = new Application();

app.static('/', `./${BUILD_DIR}`, cors()).start({ port: PORT });

console.log(`server listening on http://localhost:${PORT}`);
