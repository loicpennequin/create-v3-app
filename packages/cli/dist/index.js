#!/usr/bin/env node

// src/createProject.ts
import { resolve } from "path";
import fs from "fs-extra";
import ora from "ora";
import inquirer from "inquirer";

// src/constants.ts
import path from "path";
import { fileURLToPath } from "url";
import figlet from "figlet";
var __filename = fileURLToPath(import.meta.url);
var distPath = path.dirname(__filename);
var PKG_ROOT = path.join(distPath, "../");
var TITLE_TEXT = figlet.textSync("Create V3 App", {
  font: "Epic"
});
var DEFAULT_APP_NAME = "my-v3-app";
var CREATE_V3_APP = "create-v3-app";

// src/gui.ts
import chalk from "chalk";
import gradientString from "gradient-string";
var renderTitle = () => {
  const gradient = gradientString(
    Object.values([
      "#2ef232",
      "#00e96b",
      "#00dd96",
      "#00d0b8",
      "#00c1d2",
      "#00b1e0",
      "#00a0e3",
      "#008ddb",
      "#007bc9"
    ])
  );
  console.log(gradient.multiline(TITLE_TEXT));
};
var error = (...args) => {
  return chalk.red(...args);
};
var warn = (...args) => {
  return chalk.yellow(...args);
};
var info = (...args) => {
  return chalk.cyan(...args);
};
var success = (...args) => {
  return chalk.green(...args);
};
var logger = {
  error(...args) {
    console.log(error(...args));
  },
  warn(...args) {
    console.log(warn(...args));
  },
  info(...args) {
    console.log(info(...args));
  },
  success(...args) {
    console.log(success(...args));
  }
};

// src/createProject.ts
var cleanupProjectDir = async ({ projectName, projectDir }, spinner) => {
  if (!fs.existsSync(projectDir))
    return;
  const isEmpty = fs.readdirSync(projectDir).length === 0;
  const isCwd = projectName === ".";
  if (isEmpty && !isCwd) {
    spinner.info(`${info(projectName)} exists but is empty, continuing...
`);
    return;
  }
  spinner.stopAndPersist();
  const { shouldAbort } = await inquirer.prompt({
    name: "shouldAbort",
    type: "list",
    message: `${warn("Warning:")} ${warn(
      projectName
    )} already exists and isn't empty. How would you like to proceed?`,
    choices: [
      {
        name: "Abort installation (recommended)",
        value: true,
        short: "Abort"
      },
      {
        name: "Clear the directory and continue installation",
        value: false,
        short: "Clear"
      }
    ],
    default: true
  });
  if (shouldAbort) {
    spinner.fail("Aborting installation...");
    process.exit(1);
  }
  spinner.info(`Emptying ${info(projectName)} and creating t3 app..
`);
  fs.emptyDirSync(projectDir);
};
var renameDotFiles = (projectDir) => {
  const files = fs.readdirSync(projectDir);
  files.forEach((file) => {
    if (!file.startsWith("_"))
      return;
    fs.renameSync(
      resolve(projectDir, file),
      resolve(projectDir, `.${file.slice(1)}`)
    );
  });
};
var updatePackageJson = (projectDir, name) => {
  if (!name)
    return;
  const actualName = name === "." ? "my-v3-app" : name;
  const pkgJsonPath = resolve(projectDir, "package.json");
  const pkgJson = fs.readJSONSync(pkgJsonPath);
  pkgJson.name = actualName;
  fs.writeJSONSync(pkgJsonPath, pkgJson, { spaces: 2 });
};
var createProject = async ({
  projectName,
  projectDir,
  layers
}) => {
  const spinner = ora(`Creating project in: ${projectDir}...
`).start();
  await cleanupProjectDir({ projectName, projectDir }, spinner);
  spinner.start();
  const srcDir = resolve(PKG_ROOT, "template");
  fs.copySync(srcDir, projectDir);
  renameDotFiles(projectDir);
  updatePackageJson(projectDir, projectName);
  if (!layers.cvaUi) {
    const cvaUiDir = resolve(projectDir, "src/layers/ui");
    fs.rmSync(cvaUiDir, { recursive: true, force: true });
  }
  const scaffoldedName = projectName === "." ? "App" : info(projectName);
  spinner.succeed(`${scaffoldedName} ${success("scaffolded successfully!")}
`);
};

// src/git.ts
import chalk2 from "chalk";
import { execSync } from "child_process";
import { execa } from "execa";
import fs2 from "fs-extra";
import inquirer2 from "inquirer";
import ora2 from "ora";
import path2 from "path";
var isGitInstalled = (dir) => {
  try {
    execSync("git --version", { cwd: dir });
    return true;
  } catch (_e) {
    return false;
  }
};
var isRootGitRepo = (dir) => {
  return fs2.existsSync(path2.join(dir, ".git"));
};
var isInsideGitRepo = async (dir) => {
  try {
    await execa("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: dir,
      stdout: "ignore"
    });
    return true;
  } catch {
    return false;
  }
};
var getGitVersion = () => {
  const stdout = execSync("git --version").toString().trim();
  const gitVersionTag = stdout.split(" ")[2];
  const [major, minor] = gitVersionTag?.split(".") || [0, 0];
  return { major: Number(major), minor: Number(minor) };
};
var getDefaultBranch = () => {
  const stdout = execSync("git config --global init.defaultBranch || echo main").toString().trim();
  return stdout;
};
var checkExistingRepo = async (projectDir, spinner) => {
  const isRoot = isRootGitRepo(projectDir);
  if (!isRoot)
    return false;
  const isInside = await isInsideGitRepo(projectDir);
  const dirName = path2.parse(projectDir).name;
  if (isInside) {
    spinner.stop();
    const { overwriteGit } = await inquirer2.prompt({
      name: "overwriteGit",
      type: "confirm",
      message: `${error(
        "Warning:"
      )} Git is already initialized in "${dirName}". Initializing a new git repository would delete the previous history. Would you like to continue anyways?`,
      default: false
    });
    if (overwriteGit) {
      fs2.removeSync(path2.join(projectDir, ".git"));
    }
    return !overwriteGit;
  } else {
    spinner.stop();
    const { initializeChildGitRepo } = await inquirer2.prompt({
      name: "initializeChildGitRepo",
      type: "confirm",
      message: `${error(
        "Warning:"
      )} "${dirName}" is already in a git worktree. Would you still like to initialize a new git repository in this directory?`,
      default: false
    });
    return !initializeChildGitRepo;
  }
};
var initializeGit = async (projectDir) => {
  logger.info("Initializing Git...");
  if (!isGitInstalled(projectDir)) {
    logger.warn("Git is not installed. Skipping Git initialization.");
    return;
  }
  const spinner = ora2("Creating a new git repo...\n").start();
  const shouldAbort = await checkExistingRepo(projectDir, spinner);
  if (shouldAbort) {
    spinner.info("Skipping git initialization...");
    return;
  }
  try {
    const branchName = getDefaultBranch();
    const { major, minor } = getGitVersion();
    if (major < 2 || minor < 28) {
      await execa("git", ["init"], { cwd: projectDir });
      await execa("git", ["branch", "-m", branchName], { cwd: projectDir });
    } else {
      await execa("git", ["init", `--initial-branch=${branchName}`], {
        cwd: projectDir
      });
    }
    await execa("git", ["add", "."], { cwd: projectDir });
    spinner.succeed(
      `${success("Successfully initialized and staged")} ${chalk2.green.bold(
        "git"
      )}
`
    );
  } catch (err) {
    spinner.fail(
      `${error(
        "Failed:"
      )} could not initialize git. Update git to the latest version!
`
    );
  }
};

// src/installDependencies.ts
import chalk3 from "chalk";
import { execa as execa2 } from "execa";
import ora3 from "ora";

// src/utils.ts
import { resolve as resolve2, basename } from "path";
var getUserPkgManager = () => {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent?.startsWith("yarn"))
    return "yarn";
  if (userAgent?.startsWith("pnpm"))
    return "pnpm";
  return "npm";
};
var validationRegExp = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
var validateAppName = (input) => {
  const paths = input.split("/");
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }
  if (input === "." || validationRegExp.test(appName ?? "")) {
    return true;
  } else {
    return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
  }
};
var parseNameAndPath = (input) => {
  const paths = input.split("/");
  let appName = paths[paths.length - 1];
  if (appName === ".") {
    const parsedCwd = resolve2(process.cwd());
    appName = basename(parsedCwd);
  }
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
  if (indexOfDelimiter !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }
  const path3 = paths.filter((p) => !p.startsWith("@")).join("/");
  return [appName, path3];
};

// src/installDependencies.ts
var installWithNpm = async (projectDir) => {
  await execa2("npm", ["install"], {
    cwd: projectDir,
    stderr: "inherit"
  });
  return ora3();
};
var installWithYarn = async (projectDir) => {
  const spinner = ora3("Running yarn...").start();
  const yarnSubprocess = execa2("yarn", [], {
    cwd: projectDir,
    stdout: "pipe"
  });
  await new Promise((res, rej) => {
    yarnSubprocess.stdout?.on("data", (data) => {
      spinner.text = data.toString();
    });
    yarnSubprocess.on("error", (e) => rej(e));
    yarnSubprocess.on("close", () => res());
  });
  return spinner;
};
var installWithPnpm = async (projectDir) => {
  const spinner = ora3("Running pnpm install...").start();
  const pnpmSubprocess = execa2("pnpm", ["install"], {
    cwd: projectDir,
    stdout: "pipe"
  });
  await new Promise((res, rej) => {
    pnpmSubprocess.stdout?.on("data", (data) => {
      const text = data.toString();
      if (text.includes("Progress")) {
        spinner.text = text.includes("|") ? text.split(" | ")[1] ?? "" : text;
      }
    });
    pnpmSubprocess.on("error", (e) => rej(e));
    pnpmSubprocess.on("close", () => res());
  });
  return spinner;
};
var runInstallCommand = async (pkgManager, projectDir) => {
  switch (pkgManager) {
    case "npm":
      return installWithNpm(projectDir);
    case "pnpm":
      return installWithPnpm(projectDir);
    case "yarn":
      return installWithYarn(projectDir);
  }
};
var installDependencies = async (projectDir) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const installSpinner = await runInstallCommand(pkgManager, projectDir);
  installSpinner.succeed(chalk3.green("Successfully installed dependencies!\n"));
};

// src/logNextSteps.ts
var logNextSteps = (projectName, options) => {
  const pkgManager = getUserPkgManager();
  logger.info("Next steps:");
  projectName !== "." && logger.info(`  cd ${projectName}`);
  options.noInstall && logger.info(`  ${pkgManager} ${pkgManager === "yarn" ? "" : "install"}`);
  logger.info(`  ${pkgManager === "npm" ? "npx" : pkgManager} prisma db push`);
  logger.info(`  ${pkgManager === "npm" ? "npm run" : pkgManager} dev`);
};

// src/userOptions.ts
import { Command } from "commander";
import inquirer3 from "inquirer";
import asciify from "asciify-image";
import { resolve as resolve3 } from "path";
var defaults = {
  name: DEFAULT_APP_NAME,
  noGit: false,
  noInstall: false,
  layers: {
    cvaUi: false
  }
};
var checkInteractive = async () => {
  const isNonInteractive = process.env.SHELL?.toLowerCase().includes("git") && process.env.SHELL?.includes("bash");
  if (!isNonInteractive) {
    return {
      interactive: true,
      shouldContinue: true
    };
  }
  logger.warn(`WARNING: It looks like you are using Git Bash which is non-interactive. In order to provide options with the interactive CLI, please run create-v3t3-app with another
      terminal.`);
  const { shouldContinue } = await inquirer3.prompt({
    name: "shouldContinue",
    type: "confirm",
    message: `Continue scaffolding a default V3 app?`,
    default: true
  });
  return { interactive: false, shouldContinue };
};
var getCliArgs = () => {
  const program = new Command().name(CREATE_V3_APP);
  program.description("A CLI for creating web applications with the v3 stack").argument(
    "[dir]",
    "The name of the application, as well as the name of the directory to create"
  ).option(
    "--noGit",
    "Explicitly tell the CLI to not initialize a new git repo in the project",
    false
  ).option(
    "--noInstall",
    "Explicitly tell the CLI to not run the package manager's install command",
    false
  ).parse(process.argv);
  return { ...program.opts(), name: program.args[0] };
};
var promptAppName = async () => {
  const { name } = await inquirer3.prompt({
    name: "name",
    type: "input",
    message: "What will your project be called?",
    default: defaults.name,
    validate: validateAppName,
    transformer: (input) => {
      return input.trim();
    }
  });
  return name;
};
var promptGit = async () => {
  const { git } = await inquirer3.prompt({
    name: "git",
    type: "confirm",
    message: "Initialize a new git repository?",
    default: true
  });
  return git;
};
var promptInstall = async () => {
  const pkgManager = getUserPkgManager();
  const { install } = await inquirer3.prompt({
    name: "install",
    type: "confirm",
    message: `Would you like us to run '${pkgManager}` + (pkgManager === "yarn" ? `'?` : ` install'?`),
    default: true
  });
  return install;
};
var runCli = async () => {
  const cliArgs = getCliArgs();
  return Object.assign(cliArgs, {
    name: cliArgs.name || await promptAppName(),
    noGit: cliArgs.noGit || !await promptGit(),
    noInstall: cliArgs.noGit || !await promptInstall(),
    layers: {}
  });
};
var promptTailwind = async () => {
  const { language } = await inquirer3.prompt({
    name: "language",
    type: "list",
    message: "Which styling solutions would you like to use ?",
    choices: [
      { name: "Open Props", value: "openprops", short: "openprops" },
      { name: "Tailwind", value: "tailwind", short: "tailwind" }
    ],
    default: "openprops"
  });
  if (language === "tailwind") {
    const duck = await asciify(resolve3(PKG_ROOT, "src/assets/duck.jpg"), {
      fit: "box",
      width: 20,
      height: 20
    });
    console.log(duck);
    logger.info("Wrong choice");
    logger.info(
      "Create V3 App believes in web fundamentals and doesn't support tailwind out of the box."
    );
    logger.info("See https://create-v3-app.vercel.app/docs/why-no-tailwind");
    logger.info(
      "Don't worry, you can easily setup tailwind yourself by adding the tailwind nuxt module."
    );
  }
};
var promptCvaUi = async () => {
  logger.info(
    "Would you like to add CVA-UI to jumpstart your component authoring?"
  );
  logger.info(
    "This will add a baseline set of components to solve common UI patterns in the src/layers/ui directory"
  );
  logger.info(
    "This is not a library. After intstallation, the code will be yours: Feel free to tweak, modify, enhance of even delete whatever you want !"
  );
  const { cvaUi } = await inquirer3.prompt({
    name: "cvaUi",
    type: "confirm",
    message: "Add CVA UI ?",
    default: true
  });
  return cvaUi;
};
var getUserOptions = async () => {
  const { shouldContinue, interactive } = await checkInteractive();
  if (!shouldContinue)
    process.exit(0);
  const options = interactive ? await runCli() : defaults;
  await promptTailwind();
  options.layers.cvaUi = await promptCvaUi();
  return options;
};

// src/index.ts
(async function() {
  renderTitle();
  const options = await getUserOptions();
  const [projectName, projectDir] = parseNameAndPath(options.name);
  await createProject({ projectName, projectDir, layers: options.layers });
  if (!options.noInstall) {
    await installDependencies(projectDir);
  }
  if (!options.noGit) {
    await initializeGit(projectDir);
  }
  logNextSteps(projectName, options);
  process.exit(0);
})().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
//# sourceMappingURL=index.js.map