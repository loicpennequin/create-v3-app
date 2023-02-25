import path from 'path';
import { fileURLToPath } from 'url';
import figlet from 'figlet';

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);

export const PKG_ROOT = path.join(distPath, '../');

export const TITLE_TEXT = figlet.textSync('Create V3 App', {
  font: 'Epic'
});
export const DEFAULT_APP_NAME = 'my-v3-app';
export const CREATE_V3_APP = 'create-v3-app';
