const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'localhost',
  database: 'HealthCareDB',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log('SQL Server connected');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed!', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};
