import { resolve, basename } from 'path';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export const getUserPkgManager: () => PackageManager = () => {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent?.startsWith('yarn')) return 'yarn';
  if (userAgent?.startsWith('pnpm')) return 'pnpm';
  return 'npm';
};

const validationRegExp =
  /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export const validateAppName = (input: string) => {
  const paths = input.split('/');

  const indexOfDelimiter = paths.findIndex(p => p.startsWith('@'));

  let appName = paths[paths.length - 1];
  if (paths.findIndex(p => p.startsWith('@')) !== -1) {
    appName = paths.slice(indexOfDelimiter).join('/');
  }

  if (input === '.' || validationRegExp.test(appName ?? '')) {
    return true;
  } else {
    return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
  }
};

export const parseNameAndPath = (input: string) => {
  const paths = input.split('/');

  let appName = paths[paths.length - 1];

  if (appName === '.') {
    const parsedCwd = resolve(process.cwd());
    appName = basename(parsedCwd);
  }

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex(p => p.startsWith('@'));
  if (indexOfDelimiter !== -1) {
    appName = paths.slice(indexOfDelimiter).join('/');
  }

  const path = paths.filter(p => !p.startsWith('@')).join('/');

  return [appName, path] as const;
};
