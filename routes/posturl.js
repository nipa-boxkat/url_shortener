const express = require('express');
const router = express.Router();
const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');

// Route    POST /api/url/shorten
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    // If bad URL
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('The base URL provided was invalid. Could not send post.');
    }
    
    // If good URL
    const urlCode = shortid.generate();
    if(validUrl.isUri(longUrl)) {
        try {

        // Do a database search for whether the URL already exists 
        let url = await Url.findOne({ longUrl });

        // It exists -- so return it
        if(url) {
            res.json(url);
        // It does not exist -- so create it
        } else {
            const shortUrl = `${baseUrl}/${urlCode}`;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                Date: new Date()
            });

            await url.save();

            res.json(url);
        }

    } catch(error) {
        console.error(error);
        res.status(500).json('Could not talk to database.');
    }
    
    } else {
        res.status(401).json('Invalid URL.');
    }

});

module.exports = router;