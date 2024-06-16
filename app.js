// app.js
const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

// Define a route to get all users
app.get('/sections', async (req, res) => {
  try {
    const result = await pool.query(
      "select ws. section_data FROM website.pages as ws left join scheduling.categories as sc on sc.id::text = ws.path where sc.name ilike '%Massage Therapy%' and url ilike '%loosenupbodywork%'"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying the database', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/sections', async (req, res) => { 
  //body will be undefined unless you create a middleware
  console.log(req.body);

  res.send("done");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
