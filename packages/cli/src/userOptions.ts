import { Command } from 'commander';
import { Merge } from 'type-fest';
import inquirer from 'inquirer';
import asciify from 'asciify-image';
import { resolve } from 'path';
import { CREATE_V3_APP, DEFAULT_APP_NAME } from './constants.js';
import { getUserPkgManager, validateAppName } from './utils.js';
import { logger } from './gui.js';

export type CliOptions = {
  name: string;
  noGit: boolean;
  noInstall: boolean;
};

const defaults: CliOptions = {
  name: DEFAULT_APP_NAME,
  noGit: false,
  noInstall: false
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

  return program.opts();
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

  const options = Object.assign(cliArgs, {
    name: cliArgs.name || (await promptAppName()),
    noGit: cliArgs.noGit || !(await promptGit()),
    noInstall: cliArgs.noGit || !(await promptInstall())
  });

  return options;
};

const promptTailwind = async () => {
  const { language } = await inquirer.prompt<{ language: string }>({
    name: 'language',
    type: 'list',
    message: 'Which styling solutions would you like to use ?',
    choices: [
      { name: 'Open Props', value: 'openprops', short: 'openprops' },
      { name: 'Tailwind', value: 'tailwind', short: 'tailwind' }
    ],
    default: 'openprops'
  });

  if (language === 'tailwind') {
    const duck = await asciify(resolve(process.cwd(), 'src/assets/duck.jpg'), {
      fit: 'box',
      width: 20,
      height: 20
    });
    console.log(duck);
    logger.info('Wrong choice KEKW');
    logger.info(
      "Create V3 App believes in web fundamentals and doesn't support tailwind out of the box."
    );
    logger.info(
      "Don't worry, you can easily setup tailwind yourself by adding the tailwind nuxt module."
    );
  } else {
    logger.success('Ah, I see you are a person of culture.');
  }
};

export const getUserOptions = async (): Promise<CliOptions> => {
  const { shouldContinue, interactive } = await checkInteractive();
  if (!shouldContinue) process.exit(0);

  const options = interactive ? await runCli() : defaults;
  await promptTailwind();

  return options;
};
