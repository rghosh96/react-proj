const express = require('express')
var bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_BRONZE_URL || "postgres://oqhmzmxunfzuuk:68749503f89c1be5e51604a63d7fee111f6d846cce515da80560cdff52e34b8f@ec2-174-129-214-42.compute-1.amazonaws.com:5432/datrjbfddsutul",
  ssl: true
});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  // route to homepage
  .get('/', (req, res) => res.render('pages/index'))

  // register, routes back to homepage for login
  .post('/', async (req, res) => {
    try {
      const client = await pool.connect();

      var u = await client.query('SELECT username FROM userdata');
      const users = { 'rows': (u) ? u.rows : null };

      for (var i = 0; i < users.rows.length; i++) {
        var obj = users.rows[i];
        if (req.body.username == obj.username) {

          req.body.msg = "Username is already taken";
          req.body.msgcolor = "red";

          const results = req.body;
          res.render('pages/index', { "results": results });
          return;
        }
      }

      let chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
      var randId = "";
      var r;
      var done = true;
      do {
        for (x = 0; x < 12; x++) {
          randId += chars[Math.floor(Math.random() * chars.length)];
        }
        i = await client.query('SELECT user_id FROM userdata WHERE user_id = \'' + randId + '\'');
        const ids = { 'rows': (i) ? i.rows : null };
        for (var j = 0; j < ids.rows.length; j++) {
          var obj = ids.rows[j]
          if (obj == randId) {
            done = false;
            break;
          }
        }
      } while (!done);

      const result = await client.query('INSERT INTO userdata (user_id, username, password) VALUES (\'' + randId + '\', \'' + req.body.username + '\', \'' + req.body.password + '\')');
      res.render('pages/index', { "results": { "msg": "Success! You can now log in as a user", "msgcolor": "green" } });

    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  // login, routes to courses page on success, or back to homepage on failure
  .post('/courses', async (req, res) => {
    try {
      const client = await pool.connect();

      var u = await client.query('SELECT username, password FROM userdata');
      const users = { 'rows': (u) ? u.rows : null };

      for (var i = 0; i < users.rows.length; i++) {
        var obj = users.rows[i];
        if (obj.username == req.body.username) {
          if (obj.password == req.body.password) {

            const courses = await client.query('SELECT * FROM courses WHERE subject = \'CSCE\'');
            const subjectdata = await client.query('SELECT * FROM subjectdata');
            const query = { "subject" : "CSCE", "minhours" : "0", "maxhours" : "20", "level": "" }

            const results = { 'courses': (courses) ? courses.rows : null, 'subjectdata': (subjectdata) ? subjectdata.rows : null, "query" : (query) };
            res.render('pages/courses', results);
            client.release();
          }
        }
      }

      res.render('pages/index', { "results": { "msg": "Invalid username/password", "msgcolor": "red" } });
      client.release();

    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  // general search request
  .get('/courses', async (req, res) => {
    try {
      query = req.query

      const client = await pool.connect()

      // this starter string allows access to the entire table if no query args provided in request
      var str = 'SELECT * FROM courses';

      if (Object.keys(query).length > 0) {
        // one example of a result: SELECT * FROM courses WHERE subject = 'MATH' AND hours = '3'
        var qual = ''; // qualifier string to append to str
        for (var key of Object.keys(query)) {
          if (query[key] != '') {
            if (key == 'minhours' || key == 'maxhours') {
              if (key == 'minhours') {
                qual = qual + ' ' + key + ' >= ' + query[key] + ' AND';
              }
              if (key == 'maxhours') {
                qual = qual + ' ' + key + ' <= ' + query[key] + ' AND';
              }
            } else {
              qual = qual + ' ' + key + ' = \'' + query[key] + '\' AND';
            }
          }
        }
        if (qual.length > 0) {
          str = str + ' WHERE' + qual + ' subject IS NOT NULL'; // could be better. needed to handle the extra 'AND' at the end
        }
      } else {
        str = 'SELECT * FROM courses WHERE subject = \'CSCE\''
        query = { "subject" : "CSCE", "minhours" : "0", "maxhours" : "20", "level": "" }
      }

      const courses = await client.query(str);
      const subjectdata = await client.query('SELECT * FROM subjectdata');
      
      const results = { "courses": (courses) ? courses.rows : null, "subjectdata": (subjectdata) ? subjectdata.rows : null, "query" : (query) };
      res.render('pages/courses', results);
      client.release();

    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))
