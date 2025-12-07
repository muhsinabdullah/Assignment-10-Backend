const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Pass}@cluster0.a2ybfki.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
  const database = client.db('petService');
  const petServices = database.collection('services');
  
// post or save service to DB
  app.post('/services', async (req, res)=>{
    const data = req.body;
    const date = new Date();
    data.createdAt = date;
    console.log(data);
    const result = await petServices.insertOne(data);
    res.send(result)
  })

// get services from DB
app.get('/services', async (req, res)=>{
  const result = await petServices.find().toArray();
  res.send(result)
})

app.get('/services/:id', async(req, res)=>{
    const id = req.params
    console.log(id);

    const query = {_id: new ObjectId(id)}
    const result = await petServices.findOne(query)
    res.send(result)
})

app.get('/my-services', async(req, res)=>{
  const {email} = req.query
  console.log(email);
  const query = {email: email}
  const result = await petServices.find().toArray()
  res.send(result)
})

app.purge('/update', async(req, res) =>{
  const data = req.body;

})

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req, res)=>{
    res.send('hello developers');
})
app.listen(port, ()=>{
    console.log(`sever is running on ${port}`);
})
