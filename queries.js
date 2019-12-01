// const { Pool } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.HEROKU_POSTGRESQL_BRONZE_URL || "postgres://oqhmzmxunfzuuk:68749503f89c1be5e51604a63d7fee111f6d846cce515da80560cdff52e34b8f@ec2-174-129-214-42.compute-1.amazonaws.com:5432/datrjbfddsutul",
//     ssl: true
// });

// const getAllColumns = (request, response) => {
//     pool.query('SELECT * FROM courses')
//     if (error) {
//         throw error
//     }
//     response.status(200).json(results.rows)
// }

// module.exports = {
//     getAllColumns
// }
