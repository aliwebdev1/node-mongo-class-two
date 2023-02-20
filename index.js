const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

const users = [
    { id: 1, name: "bapparaj", age: 30, email: "bapp@gmail.com", address: 'bandarban' },
    { id: 2, name: "Rajjak", age: 25, email: 'rajjak@gmail.com', address: 'sundarban' },
    { id: 3, name: "Somrat", age: 37, email: 'somrta@gmail.com', address: 'bindaban' },
]

// middleware  dbUser1  3hFuYRzaknVjPkyJ
app.use(cors());
app.use(express.json());
// https://www.youtube.com/whath?v=alkfjalfjlaj&lisht=laflajf?email=name&name=lalka

app.get('/', (req, res) => {
    res.send('our node server is runing ')
})


const uri = "mongodb+srv://dbUser1:fupEzIZ196P5gF3i@cluster0.3ftktcj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: "habib", email: "habib@gmail.com" };
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        // app.get('/users', async (req, res) => {
        //     const cousor = userCollection.find({});
        //     const users = await cousor.toArray();
        //     res.send(users)
        // })

        app.post('/users', async (req, res) => {
            const user = req.body;
            // user.id = users.length + 1;
            // users.push(user);
            const result = await userCollection.insertOne(user)
            user.id = result.insertedId;
            res.send(user)
            console.log(req.query);

        })

    }
    finally {
        //  await client.close();
    }

}


run().catch(err => console.log(err))


app.get('/users', (req, res) => {
    // console.log(req.query.name);
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(us => us.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered)
    }
    else (res.send(users))
})



// app.post('/users', (req, res) => {
//     // console.log("post api hit");
//     // console.log('req.body:', req.body);
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     res.send(user)
//     console.log(req.query);

// })

app.listen(port, () => {
    console.log(`Our class two server in run on: ${port}`);
})