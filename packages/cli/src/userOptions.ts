import { Command } from 'commander';
import { Merge } from 'type-fest';
import inquirer from 'inquirer';
import asciify from 'asciify-image';
import { resolve } from 'path';
import { CREATE_V3_APP, DEFAULT_APP_NAME, PKG_ROOT } from './constants.js';
import { getUserPkgManager, validateAppName } from './utils.js';
import { logger } from './gui.js';

export type CliOptions = {
  name: string;
  noGit: boolean;
  noInstall: boolean;
  layers: {
    cvaUi: boolean;
  };
};

const defaults: CliOptions = {
  name: DEFAULT_APP_NAME,
  noGit: false,
  noInstall: false,
  layers: {
    cvaUi: false
  }
};

const checkInteractive = async () => {
  const isNonInteractive =
    process.env.SHELL?.toLowerCase().includes('git') &&
    process.env.SHELL?.includes('bash');

  if (!isNonInteractive) {
    return {
      interactive: true,
      shouldContinue: true
    };
  }

  logger.warn(`WARNING: It looks like you are using Git Bash which is non-interactive. In order to provide options with the interactive CLI, please run create-v3t3-app with another
      terminal.`);

  const { shouldContinue } = await inquirer.prompt<{
    shouldContinue: boolean;
  }>({
    name: 'shouldContinue',
    type: 'confirm',
    message: `Continue scaffolding a default V3 app?`,
    default: true
  });

  return { interactive: false, shouldContinue };
};

const getCliArgs = (): Merge<CliOptions, { name: string | undefined }> => {
  const program = new Command().name(CREATE_V3_APP);
  program
    .description('A CLI for creating web applications with the v3 stack')
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create'
    )
    .option(
      '--noGit',
      'Explicitly tell the CLI to not initialize a new git repo in the project',
      false
    )
    .option(
      '--noInstall',
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .parse(process.argv);

  return { ...program.opts(), name: program.args[0] };
};

const promptAppName = async (): Promise<string> => {
  const { name } = await inquirer.prompt<Pick<CliOptions, 'name'>>({
    name: 'name',
    type: 'input',
    message: 'What will your project be called?',
    default: defaults.name,
    validate: validateAppName,
    transformer: (input: string) => {
      return input.trim();
    }
  });

  return name;
};

const promptGit = async (): Promise<boolean> => {
  const { git } = await inquirer.prompt<{ git: boolean }>({
    name: 'git',
    type: 'confirm',
    message: 'Initialize a new git repository?',
    default: true
  });

  return git;
};

const promptInstall = async (): Promise<boolean> => {
  const pkgManager = getUserPkgManager();

  const { install } = await inquirer.prompt<{ install: boolean }>({
    name: 'install',
    type: 'confirm',
    message:
      `Would you like us to run '${pkgManager}` +
      (pkgManager === 'yarn' ? `'?` : ` install'?`),
    default: true
  });

  return install;
};

const runCli = async () => {
  const cliArgs = getCliArgs();

  return Object.assign(cliArgs, {
    name: cliArgs.name || (await promptAppName()),
    noGit: cliArgs.noGit || !(await promptGit()),
    noInstall: cliArgs.noGit || !(await promptInstall()),
    layers: {}
  });
};

// const promptCvaUi = async () => {
//   logger.info(
//     'Would you like to add CVA-UI to jumpstart your component authoring?'
//   );
//   logger.info(
//     'This will add a baseline set of components to solve common UI patterns in the src/layers/ui directory'
//   );
//   logger.info(
//     'This is not a library. After intstallation, the code will be yours: Feel free to tweak, modify, enhance of even delete whatever you want !'
//   );
//   const { cvaUi } = await inquirer.prompt<{ cvaUi: boolean }>({
//     name: 'cvaUi',
//     type: 'confirm',
//     message: 'Add CVA UI ?',
//     default: true
//   });

//   return cvaUi;
// };

export const getUserOptions = async (): Promise<CliOptions> => {
  const { shouldContinue, interactive } = await checkInteractive();
  if (!shouldContinue) process.exit(0);

  const options = interactive ? await runCli() : defaults;
  // options.layers.cvaUi = await promptCvaUi();

  return options;
};
