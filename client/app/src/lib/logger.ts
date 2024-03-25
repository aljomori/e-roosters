import log from 'loglevel';
import { isDevEnvironment } from '../config/environment';

log.setLevel(isDevEnvironment ? log.levels.DEBUG : log.levels.INFO);

export default log;
