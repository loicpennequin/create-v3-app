import { resolve } from 'path';
import fs from 'fs-extra';
import ora, { Ora } from 'ora';
import inquirer from 'inquirer';
import { PKG_ROOT } from './constants.js';
import { info, success, warn } from './gui.js';

export type CreateProjectOptions = {
  projectName?: string;
  projectDir: string;
};

const cleanupProjectDir = async (
  { projectName, projectDir }: CreateProjectOptions,
  spinner: Ora
) => {
  if (!fs.existsSync(projectDir)) return;

  console.log(projectDir);
  const isEmpty = fs.readdirSync(projectDir).length === 0;
  const isCwd = projectName === '.';

  if (isEmpty && !isCwd) {
    spinner.info(`${info(projectName)} exists but is empty, continuing...\n`);
    return;
  }

  spinner.stopAndPersist();

  const { shouldAbort } = await inquirer.prompt<{
    shouldAbort: boolean;
  }>({
    name: 'shouldAbort',
    type: 'list',
    message: `${warn('Warning:')} ${warn(
      projectName
    )} already exists and isn't empty. How would you like to proceed?`,
    choices: [
      {
        name: 'Abort installation (recommended)',
        value: true,
        short: 'Abort'
      },
      {
        name: 'Clear the directory and continue installation',
        value: false,
        short: 'Clear'
      }
    ],
    default: true
  });

  if (shouldAbort) {
    spinner.fail('Aborting installation...');
    process.exit(1);
  }

  spinner.info(`Emptying ${info(projectName)} and creating t3 app..\n`);
  fs.emptyDirSync(projectDir);
};

const renameDotFiles = (projectDir: string) => {
  const files = fs.readdirSync(projectDir);
  files.forEach(file => {
    if (!file.startsWith('_')) return;
    fs.renameSync(
      resolve(projectDir, file),
      resolve(projectDir, `.${file.slice(1)}`)
    );
  });
};

export const createProject = async ({
  projectName,
  projectDir
}: CreateProjectOptions) => {
  const spinner = ora(`Creating project in: ${projectDir}...\n`).start();

  await cleanupProjectDir({ projectName, projectDir }, spinner);

  spinner.start();

  const srcDir = resolve(PKG_ROOT, 'template');
  fs.copySync(srcDir, projectDir);
  renameDotFiles(projectDir);

  const scaffoldedName = projectName === '.' ? 'App' : info(projectName);

  spinner.succeed(`${scaffoldedName} ${success('scaffolded successfully!')}\n`);
};
