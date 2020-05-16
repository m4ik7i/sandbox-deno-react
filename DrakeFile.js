import { run, sh, task } from 'https://deno.land/x/drake/mod.ts';

task('clean', [], async () => {
  await sh('rm -rf dist');
});

task('build', [], async () => {
  await run('clean');
  await sh('cp -pr public dist');
  await run('bundle');
});

task('bundle', [], async () => {
  await sh('mkdir -p dist/js');
  await sh('deno bundle src/main.js dist/js/bundle.js');
});

task('serve', [], async () => {
  await sh('serve dist');
});

run();
