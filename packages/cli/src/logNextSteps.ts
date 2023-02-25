import { logger } from './gui.js';
import { CliOptions } from './userOptions.js';
import { getUserPkgManager } from './utils.js';

export const logNextSteps = (projectName: string, options: CliOptions) => {
  const pkgManager = getUserPkgManager();
  logger.info('Next steps:');
  projectName !== '.' && logger.info(`  cd ${projectName}`);
  options.noInstall &&
    logger.info(`  ${pkgManager} ${pkgManager === 'yarn' ? '' : 'install'}`);
  logger.info(`  ${pkgManager === 'npm' ? 'npx' : pkgManager} prisma db push`);
  logger.info(`  ${pkgManager === 'npm' ? 'npm run' : pkgManager} dev`);
};
