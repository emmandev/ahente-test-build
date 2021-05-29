import 'reflect-metadata';
import { addExitHook } from 'exit-hook-plus';
import { start, stop } from './app';

start();

addExitHook(async () => {
  await stop();
});
