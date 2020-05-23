import { run, sh, task } from 'https://deno.land/x/drake/mod.ts';

const DEV_DIR = 'dev';
const BUILD_DIR = 'build';

const babel = './node_modules/.bin/babel';
const serve = 'deno run --allow-net --allow-read scripts/serve.js';

task('clean:dev', [], async () => {
  await sh(`rm -rf ${DEV_DIR}`);
});

task('clean:build', [], async () => {
  await sh(`rm -rf ${BUILD_DIR}`);
});

task('dev', [], async () => {
  await run('clean:dev');
  await sh(`cp -pr public ${DEV_DIR}`);
  await sh(`${babel} src --out-dir ${DEV_DIR}/js`);
  await sh(`${serve} ${DEV_DIR} 3000`);
});

task('build', [], async () => {
  await run('clean:build');
  await sh(`cp -pr public ${BUILD_DIR}`);
  await sh(`mkdir -p ${BUILD_DIR}/js`);
  await sh(`deno bundle src/main.js ${BUILD_DIR}/js/main.js`);
});

task('serve', [], async () => {
  await sh(`${serve} ${BUILD_DIR}`);
});

run();
