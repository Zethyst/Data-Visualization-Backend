const { MongoClient } = require('mongodb');
const data = require('./data');
require('dotenv').config();

async function insertData() {
    const uri = process.env.MONGO_URI; 
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('Dashboard');
        const collection = database.collection('report');

        for (let i = 0; i < 100; i++) {
            const newData = data.map(item => ({ ...item, id: item.id + (i * data.length) }));
            await collection.insertMany(newData);
        }

        console.log('[+] Data inserted successfully.');
    } catch (error) {
        console.error('[-] Error inserting data:', error);
    } finally {
        await client.close();
    }
}

insertData();
