const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;



const app = express();
app.use(cors())
app.use(express.json());

//user:mydbuser1
//password:6NC3ILrpnv7TFr1x


// const uri = "mongodb+srv://mydbuser1:6NC3ILrpnv7TFr1x@cluster0.4c1ut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("FoodDB").collection("users");
//     // perform actions on the collection object
//     const user = { name: "labu", email: "labu@gmail.com", phone: 001393138}
//     console.log('hitting the db');
//     collection.insertOne(user)
//         .then(() => {
//             console.log('insert successful');
//         })
//         .finally(() => {
//             client.close();
//         })
// });


const uri = "mongodb+srv://mydbuser1:6NC3ILrpnv7TFr1x@cluster0.4c1ut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);


async function run() {

    try {

        await client.connect();

        const database = client.db("FoodDB");
        const usersCollection = database.collection('users')

        // get api
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const users = await cursor.toArray()
            res.send(users)
        })

        // post method
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);

            console.log('Got new User', req.body);
            console.log('Added New user', result);
            res.json(result);
        })

        // delete api

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            console.log('deleting user with id ', result);
            res.json(result);
        })

        // update api

        app.

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('ruunig my server')
})

app.listen(port, () => {
    console.log("running server on port ", port);
})