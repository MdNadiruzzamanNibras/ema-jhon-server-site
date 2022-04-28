const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app =express()
const port = process.env.PORT || 5000;

// midleware

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('jhon is runing for ema')
})


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.ykync.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
        try{
            await client.connect();
            const productConnection =client.db("emaJhon").collection("product")
            app.get('/product', async(req,res)=>{
                const query = {}
                const cursor = productConnection.find(query)
                const products = await cursor.toArray();
                res.send(products)
            })
            
        }
        finally{

        }
}

run().catch(console.dir)
app.listen(port,()=>{
    console.log('ema is listening', port)
})