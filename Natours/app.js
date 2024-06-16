import express from 'express';

const app = express();

app.get('/', (req, res) => {

  // res.send('Hello there server');

  res.status(200).json({message:"Hello there, from server",app:"Natours"});
})

app.post('/', (req, res) => {
  res.send("You can send POST this to endpoints...")
})

const port = 3000;
app.listen(port, () => {
  console.log(`app is running at port ${port}...`)
});