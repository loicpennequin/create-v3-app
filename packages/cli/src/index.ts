#!/usr/bin/env node

import { createProject } from './createProject.js';
import { initializeGit } from './git.js';
import { logger, renderTitle } from './gui.js';
import { installDependencies } from './installDependencies.js';
import { logNextSteps } from './logNextSteps.js';
import { getUserOptions } from './userOptions.js';
import { parseNameAndPath } from './utils.js';

(async function () {
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

  logNextSteps(projectName as string, options);

  process.exit(0);
})().catch(err => {
  logger.error('Aborting installation...');
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      'An unknown error has occurred. Please open an issue on github with the below:'
    );
    console.log(err);
  }
  process.exit(1);
});
