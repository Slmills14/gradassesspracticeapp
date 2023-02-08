const { Pool } = require('pg');

const PG_URI =
  'postgres://lolypbpb:RFUJiCMaZVJMUd5qO8G2HvUbi3Xg3mj1@chunee.db.elephantsql.com/lolypbpb';

const pool = new Pool({
  // user: 'lolypbpb',
  connectionString: PG_URI,
  password: 'RFUJiCMaZVJMUd5qO8G2HvUbi3Xg3mj1',
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
