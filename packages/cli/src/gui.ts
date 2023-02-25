import chalk from 'chalk';
import gradientString from 'gradient-string';
import { TITLE_TEXT } from './constants.js';

export const renderTitle = () => {
  const gradient = gradientString(
    Object.values([
      '#2ef232',
      '#00e96b',
      '#00dd96',
      '#00d0b8',
      '#00c1d2',
      '#00b1e0',
      '#00a0e3',
      '#008ddb',
      '#007bc9'
    ])
  );

  console.log(gradient.multiline(TITLE_TEXT));
};

export const error = (...args: unknown[]) => {
  return chalk.red(...args);
};
export const warn = (...args: unknown[]) => {
  return chalk.yellow(...args);
};
export const info = (...args: unknown[]) => {
  return chalk.cyan(...args);
};
export const success = (...args: unknown[]) => {
  return chalk.green(...args);
};

export const logger = {
  error(...args: unknown[]) {
    console.log(error(...args));
  },
  warn(...args: unknown[]) {
    console.log(warn(...args));
  },
  info(...args: unknown[]) {
    console.log(info(...args));
  },
  success(...args: unknown[]) {
    console.log(success(...args));
  }
};
