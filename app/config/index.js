const { join } = require('path');

require('dotenv').config({ path: join(__dirname, '../../.env') });

module.exports = {
  dbUrl: process.env.DB_URL
};
