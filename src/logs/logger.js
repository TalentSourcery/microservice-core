import { appendFile } from 'fs/promises';

const logger = {
  async info(message) {
    console.log(message);
    await appendFile('src/logs/info.log', `${message}\n`);
  },
  async error(err) {
    console.error(err);
    await appendFile('src/logs/error.log', `${err.stack}\n\n`);
  },
};

export default logger;
