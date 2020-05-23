import { run, sh, task } from 'https://deno.land/x/drake/mod.ts';

const DEV_DIR = 'dev';
const BUILD_DIR = 'build';

task('clean:dev', [], async () => {
  await sh(`rm -rf ${DEV_DIR}`);
});

task('clean:build', [], async () => {
  await sh(`rm -rf ${BUILD_DIR}`);
});

task('dev', [], async () => {
  await run('clean:dev');
  await sh(`cp -pr public ${DEV_DIR}`);
  await run('babel');
  await run('serve:dev');
});

task('babel', [], async () => {
  await sh(`./node_modules/.bin/babel src --out-dir ${DEV_DIR}/js`);
});

task('build', [], async () => {
  await run('clean:build');
  await sh(`cp -pr public ${BUILD_DIR}`);
  await run('bundle');
});

task('bundle', [], async () => {
  await sh(`mkdir -p ${BUILD_DIR}/js`);
  await sh(`deno bundle src/main.js ${BUILD_DIR}/js/main.js`);
});

const serve = (dir = '.', port = 5000) => {
  return sh(`deno run --allow-net --allow-read scripts/serve.js ${dir} ${port}`);
};

task('serve:dev', [], async () => {
  await serve('dev', 3000);
});

task('serve', [], async () => {
  await serve('build', 5000);
});

run();
