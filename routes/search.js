var { CONNECTION_URL, DATABASE, OPTIONS } = require("../config/mongodb.config");
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/*", (req, res) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        var keyword = req.query.keyword || "";
        var regexp = new RegExp(`.*${keyword}.*`);

        var db = client.db(DATABASE);
        db.collection("posts").find({
            $or: [{ title: regexp }, { contents: regexp }]
        }).sort({ published: -1 }).toArray().then((list) => {
            var data = {
                keyword,
                list
            };
            res.render("/search/list.ejs", data);
        }).catch((error) => {
            throw error;
        }).then(() => {
            client.close();
        });
    });
});

module.exports = router;