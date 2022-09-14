const path = require('path')
const express = require('express')


const PORT = process.env.PORT || 3000
const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'bupld')))



app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, 'build', 'index.html'))
})

app.listen(PORT, err => {
    if (err) throw err;
    console.log("%c Server running", "color: green");
})