const express = require('express');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fyera.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run() {

    try {
        client.connect()

        const database = client.db('Travell');
        const dataCollection = database.collection('hotels');
        const userCollection = database.collection('users');
        const restauCollection = database.collection('restaurants');
        const carsCollection = database.collection('cars');
        const packageCollection = database.collection('packages');
        const tourCollection = database.collection('tours');
        const offerCollection = database.collection('offers')
        const gallleryCollection = database.collection('gallery');

        //get all data
        app.get('/hotels', async (req, res) => {
            const cursor = dataCollection.find({});
            const hotels = await cursor.toArray()
            res.send(hotels)
            console.log(' get api hitted')
        })
        //restaurent api
        app.get('/restaurants', async (req, res) => {
            const cursor = restauCollection.find({});
            const restau = await cursor.toArray()
            res.send(restau)
            console.log(' get api hitted')
        })
        //cars api
        app.get('/cars', async (req, res) => {
            const cursor = carsCollection.find({});
            const cars = await cursor.toArray()
            res.send(cars)
            console.log(' get api hitted')
        })
        // package
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const packages = await cursor.toArray()
            res.send(packages)
            console.log(' get api hitted')
        })

        //tours 
        app.get('/tours', async (req, res) => {
            const cursor = tourCollection.find({});
            const tours = await cursor.toArray()
            res.send(tours)
            console.log('api got hitted')
        })
        //offers
        app.get('/offers', async (req, res) => {
            const cursor = offerCollection.find({});
            const offers = await cursor.toArray()
            res.send(offers)
            console.log('api got hitted')
        })


        //manage orders
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const orders = await cursor.toArray()
            res.send(orders);

        })

        // myorders
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            console.log('email is', email);
            const query = { email: email };
            const orders = await userCollection.find(query).toArray();
            res.send(JSON.stringify(orders));
        })


        //post api for user
        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollection.insertOne(users);
            res.send(JSON.stringify(result));
        })

        //delete my orders
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(JSON.stringify(result))
            console.log('delete hitted', query)
        })
        //api get galley
        app.get('/gallery', async (req, res) => {
            const cursor = gallleryCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
            console.log('gallery hitted')
        })


    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('hello from assignment-11 and updated');
})

app.listen(port, () => {
    console.log('listening from asiignment-11 port', port)
})