import chalk from 'chalk';
import { execa } from 'execa';
import ora, { type Ora } from 'ora';
import { logger } from './gui.js';
import { PackageManager, getUserPkgManager } from './utils.js';

type InstallFunction = (projectDir: string) => Promise<Ora>;

const installWithNpm: InstallFunction = async projectDir => {
  await execa('npm', ['install'], {
    cwd: projectDir,
    stderr: 'inherit'
  });

  return ora();
};

const installWithYarn: InstallFunction = async projectDir => {
  const spinner = ora('Running yarn...').start();
  const yarnSubprocess = execa('yarn', [], {
    cwd: projectDir,
    stdout: 'pipe'
  });

  await new Promise<void>((res, rej) => {
    yarnSubprocess.stdout?.on('data', (data: Buffer) => {
      spinner.text = data.toString();
    });
    yarnSubprocess.on('error', e => rej(e));
    yarnSubprocess.on('close', () => res());
  });

  return spinner;
};

const installWithPnpm: InstallFunction = async projectDir => {
  const spinner = ora('Running pnpm install...').start();
  const pnpmSubprocess = execa('pnpm', ['install'], {
    cwd: projectDir,
    stdout: 'pipe'
  });

  await new Promise<void>((res, rej) => {
    pnpmSubprocess.stdout?.on('data', (data: Buffer) => {
      const text = data.toString();

      if (text.includes('Progress')) {
        spinner.text = text.includes('|') ? text.split(' | ')[1] ?? '' : text;
      }
    });
    pnpmSubprocess.on('error', e => rej(e));
    pnpmSubprocess.on('close', () => res());
  });

  return spinner;
};

const runInstallCommand = async (
  pkgManager: PackageManager,
  projectDir: string
): Promise<Ora> => {
  switch (pkgManager) {
    case 'npm':
      return installWithNpm(projectDir);
    case 'pnpm':
      return installWithPnpm(projectDir);
    case 'yarn':
      return installWithYarn(projectDir);
  }
};

export const installDependencies = async (projectDir: string) => {
  logger.info('Installing dependencies...');
  const pkgManager = getUserPkgManager();

  const installSpinner = await runInstallCommand(pkgManager, projectDir);

  installSpinner.succeed(chalk.green('Successfully installed dependencies!\n'));
};
