const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

router.get('/data', async(req,res)=>{
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const database = client.db('Dashboard');
        const collection = database.collection('report');

        const result = await collection.find({}).toArray();
        const data = result.flat(); // Flatten the array if needed

        // console.log('[+] Data fetched successfully:', data);
        res.json({data});
    } catch (error) {
        console.error('[-] Error fetching data:', error);
        res.status(500).json({ error: "Internal Server error" });
    } finally {
        await client.close();
    }
})

module.exports = router;