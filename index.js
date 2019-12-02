const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_BRONZE_URL || "postgres://oqhmzmxunfzuuk:68749503f89c1be5e51604a63d7fee111f6d846cce515da80560cdff52e34b8f@ec2-174-129-214-42.compute-1.amazonaws.com:5432/datrjbfddsutul",
  ssl: true
});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

  .get('/courses', async (req, res) => {
    try {
      const client = await pool.connect()

      // this starter string allows access to the entire table if no query args provided in request
      var str = 'SELECT * FROM courses';

      if (Object.keys(req.query).length > 0) {
        // one example of a result: SELECT * FROM courses WHERE subject = 'MATH' AND hours = '3'
        var qual = ''; // qualifier for filter
        for (var key of Object.keys(req.query)) {
          if (req.query[key] != '') {
            if (key == 'minhours' || key == 'maxhours') {
              if (key == 'minhours') {
                qual = qual + ' ' + key + ' >= ' + req.query[key] + ' AND';
              }
              if (key == 'maxhours') {
                qual = qual + ' ' + key + ' <= ' + req.query[key] + ' AND';
              }
            } else {
              qual = qual + ' ' + key + ' = \'' + req.query[key] + '\' AND';
            }
          }
        }
        if (qual.length > 0) {
          str = str + ' WHERE' + qual + ' subject IS NOT NULL'; // could be better. needed to handle the extra 'AND' at the end
        }
      }

      const result = await client.query(str);
      const results = { 'results': (result) ? result.rows : null };
      res.render('pages/courses', results)
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))
