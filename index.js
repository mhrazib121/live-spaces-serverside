const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const app = express();
app.use(cors())
app.use(express.json());
require('dotenv').config()

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvulc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('live-spaces');
        const popularShows = database.collection('popularShows');

        // Product 
        app.get('/popularshows', async (req, res) => {
            const cursor = popularShows.find({});
            const popularShow = await cursor.toArray();
            res.send(popularShow);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hellow World')
})

app.listen(port, () => {
    console.log('connected')
})