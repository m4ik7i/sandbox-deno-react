import { run, sh, task } from 'https://deno.land/x/drake/mod.ts';

const BUILD_DIR = 'build';

task('clean', [], async () => {
  await sh(`rm -rf ${BUILD_DIR}`);
});

task('build', [], async () => {
  await run('clean');
  await sh(`cp -pr public ${BUILD_DIR}`);
  await run('bundle');
});

task('bundle', [], async () => {
  await sh(`mkdir -p ${BUILD_DIR}/js`);
  await sh(`deno bundle src/main.js ${BUILD_DIR}/js/bundle.js`);
});

task('serve', [], async () => {
  await sh('deno run --allow-net --allow-read scripts/serve.js');
});

run();
