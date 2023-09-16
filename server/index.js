const express = require('express')
const axios = require('axios');

const app = express()
require('dotenv').config({ path: '../.env' });
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.get('/feed', async (req, res) => {

    try {
        const response = await axios.get('https://www.rotanacareers.com/rss/all/');
        res.set('Content-Type', 'text/xml; charset=utf-8');
        res.send(response.data);
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: 'Failed to fetch feed'
        });
    }
})


app.get('/address/:country', async (req, res) => {
    //? google maps API doesn't return a valid address for Jordan but returns normally for Amman 
    //? it is a work around since it works for all other countries 
    const country = req.params.country.toLowerCase() === 'jordan' ? 'amman' : req.params.country;

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                country
            )}&key=${process.env.GOOGLE_MAP_API_KEY}`

        );
        res.send(response.data);
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: 'Failed to fetch address'
        });
    }
});







const PORT = process.env.SERVER_PORT || 4050
app.listen(PORT, () => console.log(`listening on ${PORT}`))