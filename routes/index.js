const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// Route GET /:code         -- Directs user from short URL to long URL
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        // If the URL is found in mongoDB database
        if(url) {
            return res.redirect(url.longUrl);
        } 
        // If not
        else {
            return res.status(404).json('URL not found.');
        }
    } catch (error) {
        console.error(error);
    }
});

// Route GET ALL -- Grabs all documents
router.get('/', async (req, res) => {
    try {
        const allPosts = await Url.find({});
        res.json(allPosts);

    } catch (error) {
        console.error(error);
    }
});



module.exports = router;