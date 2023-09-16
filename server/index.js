const express = require('express')
const request = require('request')
const app = express()
require('dotenv').config({ path: '../.env' });
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.get('/feed', (req, res) => {
    request(
        { url: 'https://www.rotanacareers.com/rss/all/' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({
                    type: 'error', message:
                        err.message
                })
            }

            res.set('Content-Type', 'text/xml; charset=utf-8')
            res.send(Buffer.from(body))
        })
})


app.get('/address/:country', (req, res) => {
    const country = req.params.country;
    request(
        {
            url:
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    (country === 'Jordan' ? 'Amman' : country)
                )}&key=${process.env.GOOGLE_MAP_API_KEY}`
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({
                    type: 'error', message:
                        err.message
                })
            }


            res.send(body)
        })
})







const PORT = process.env.SERVER_PORT || 4050
app.listen(PORT, () => console.log(`listening on ${PORT}`))