import chalk from 'chalk';
import { execSync } from 'child_process';
import { execa } from 'execa';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora, { type Ora } from 'ora';
import path from 'path';
import { error, logger, success } from './gui.js';

const isGitInstalled = (dir: string): boolean => {
  try {
    execSync('git --version', { cwd: dir });
    return true;
  } catch (_e) {
    return false;
  }
};

const isRootGitRepo = (dir: string): boolean => {
  return fs.existsSync(path.join(dir, '.git'));
};

const isInsideGitRepo = async (dir: string): Promise<boolean> => {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd: dir,
      stdout: 'ignore'
    });
    return true;
  } catch {
    return false;
  }
};

const getGitVersion = () => {
  const stdout = execSync('git --version').toString().trim();
  const gitVersionTag = stdout.split(' ')[2];
  const [major, minor] = gitVersionTag?.split('.') || [0, 0];

  return { major: Number(major), minor: Number(minor) };
};

const getDefaultBranch = () => {
  const stdout = execSync('git config --global init.defaultBranch || echo main')
    .toString()
    .trim();

  return stdout;
};

const checkExistingRepo = async (
  projectDir: string,
  spinner: Ora
): Promise<boolean> => {
  const isRoot = isRootGitRepo(projectDir);
  if (!isRoot) return false;

  const isInside = await isInsideGitRepo(projectDir);
  const dirName = path.parse(projectDir).name; // skip full path for logging

  if (isInside) {
    spinner.stop();
    const { overwriteGit } = await inquirer.prompt<{
      overwriteGit: boolean;
    }>({
      name: 'overwriteGit',
      type: 'confirm',
      message: `${error(
        'Warning:'
      )} Git is already initialized in "${dirName}". Initializing a new git repository would delete the previous history. Would you like to continue anyways?`,
      default: false
    });
    if (overwriteGit) {
      fs.removeSync(path.join(projectDir, '.git'));
    }

    return !overwriteGit;
  } else {
    spinner.stop();
    const { initializeChildGitRepo } = await inquirer.prompt<{
      initializeChildGitRepo: boolean;
    }>({
      name: 'initializeChildGitRepo',
      type: 'confirm',
      message: `${error(
        'Warning:'
      )} "${dirName}" is already in a git worktree. Would you still like to initialize a new git repository in this directory?`,
      default: false
    });

    return !initializeChildGitRepo;
  }
};

export const initializeGit = async (projectDir: string) => {
  logger.info('Initializing Git...');

  if (!isGitInstalled(projectDir)) {
    logger.warn('Git is not installed. Skipping Git initialization.');
    return;
  }

  const spinner = ora('Creating a new git repo...\n').start();

  const shouldAbort = await checkExistingRepo(projectDir, spinner);
  if (shouldAbort) {
    spinner.info('Skipping git initialization...');
    return;
  }

  try {
    const branchName = getDefaultBranch();

    const { major, minor } = getGitVersion();
    if (major < 2 || minor < 28) {
      await execa('git', ['init'], { cwd: projectDir });
      await execa('git', ['branch', '-m', branchName], { cwd: projectDir });
    } else {
      await execa('git', ['init', `--initial-branch=${branchName}`], {
        cwd: projectDir
      });
    }
    await execa('git', ['add', '.'], { cwd: projectDir });
    spinner.succeed(
      `${success('Successfully initialized and staged')} ${chalk.green.bold(
        'git'
      )}\n`
    );
  } catch (err) {
    spinner.fail(
      `${error(
        'Failed:'
      )} could not initialize git. Update git to the latest version!\n`
    );
  }
};
