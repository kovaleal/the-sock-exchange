import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

app.get('/socks/:color', async (req, res) => {
    try {
        // Console log specific parts of the request
        //console.log("Headers:", req.headers);
        console.log()
        console.log("URL:", req.url);
        console.log("Method:", req.method);

        const { color } = req.params;

        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);
        const jsonFlt = jsonObj.filter((sock) =>
            sock.color.toUpperCase() === color.toUpperCase());

        console.log(jsonFlt);
        if (jsonFlt === undefined || jsonFlt.length == 0) {
            res.status(404).send();
        }
        else {
            res.json(jsonFlt);
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/socks', async (req, res) => {
    try {
        // Console log the entire request object
        //console.log(req);

        // Console log specific parts of the request
        //console.log("Headers:", req.headers);
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/socks/search', async (req, res) => {
    const client = await MongoClient.connect(url);

    try {
        // Console log specific parts of the request
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);

        const { searchTerm } = req.body;
        const colorIns = new RegExp(searchTerm, "i");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({"sockDetails.color": colorIns}).toArray();
        //console.log(socks);

        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    } finally { await client.close();}
});

app.post('/socks', async (req, res) => {
    const client = await MongoClient.connect(url);

    try {
        // AddSock form
        // Console log specific parts of the request
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);

        const { userId, sockDetails, additionalFeatures, addedTimestamp } = req.body;
        const record = {
            "sockDetails": {
                "size": sockDetails.size,
                "color": sockDetails.color,
                "pattern": sockDetails.pattern,
                "material": sockDetails.material,
                "condition": sockDetails.condition,
                "forFoot": sockDetails.forFoot,
            },
            "additionalFeatures": {
                "waterResistant": additionalFeatures.waterResistant,
                "padded": additionalFeatures.padded,
                "antiBacterial": additionalFeatures.antiBacterial,
            },
            "addedTimestamp": addedTimestamp,
        }

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const stat = await collection.insertOne(record);

        console.log('Output: ' + JSON.stringify(stat));

        if (stat.acknowledged && stat.insertedId) {
            res.status(201).send({
                status: 'success',
                message: 'Sock added!',
                insertedId: stat.insertedId,
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    } finally { await client.close();}
});

app.post('/socks', async (req, res) => {
    try {
        // Obligatory reference to POST Malone
        console.log("If POST Malone were a sock, he'd be the one with the most colorful pattern.");
        // Simulate creating a user
        const { username, email } = req.body;
        if (!username || !email) {
            // Bad request if username or email is missing
            return res.status(400).send({ error: 'Username and email are required.' });
        }

        // Respond with the created user information and a 201 Created status
        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/1234', // This URL should point to the newly created user
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.delete('/socks/:id', async (req, res) => {
    const client = await MongoClient.connect(url);

    try {
        // Delete Sock form
        // Console log specific parts of the request
        console.log("URL:", req.url);
        console.log("Method:", req.method);

        const { id } = req.params;
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const filter = { "_id": new ObjectId(id) };
        const stat = await collection.deleteOne(filter);

        console.log('Output: ' + JSON.stringify(stat));

        if (stat.acknowledged && stat.deletedCount > 0) {
            res.status(204).send({
                status: 'success',
                message: 'Sock deleted!',
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    } finally { await client.close();}
});

/*
app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting sock with ID:', id);
        res.status(200).send('Sock deleted successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});
*/

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email, // This URL should point to the newly created user
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});