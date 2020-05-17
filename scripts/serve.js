import { Application, send } from 'https://deno.land/x/oak/mod.ts';

const BUILD_DIR = 'build';
const PORT = 5000;

const app = new Application();

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/${BUILD_DIR}`,
    index: 'index.html',
  });
});

console.log(`server listening on http://localhost:${PORT}`);

await app.listen({ port: PORT });
