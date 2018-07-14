var express = require('express');
var router = express.Router();

var ws = require('../websocketServer').listen('8001');

var savedPosts = [];

router.get('/allPosts', function (req, res) {
   res.send(JSON.stringify(savedPosts));
})

router.post('/request', function (req, res) {
    if (req){
        var parsedData = {};
        parsedData.username = req.body.data.actor.username;
        parsedData.dateCreated = req.body.data.date_created;
        parsedData.note = req.body.data.note;
        parsedData.amount = req.body.data.amount;
        parsedData.url = req.body.data.actor.profile_picture_url;


        console.log("POST received: " + JSON.stringify(parsedData, null, 2));
        savedPosts.push(parsedData);
        console.log("added to saved posts, arr length: " + savedPosts.length);    
        res.send("POST received: " + JSON.stringify(req.body));
        ws.broadcast(JSON.stringify(parsedData));
    }
 })

 module.exports = router;
