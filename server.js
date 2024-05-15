const express = require('express')
var cors = require("cors");
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', require("./Routes/Rows"));

app.listen(port, () => {
    console.log(`[+] Listening on port ${port}...`)
})

