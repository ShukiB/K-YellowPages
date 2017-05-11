var express = require('express');
var router = express.Router();
var _ = require('lodash'); // decided to use lodash but could achieve the same with native JS array function
var fs = require("fs");

router.get('/', function(req, res, next) {
    fs.readFile('DB/people.json', 'utf8', function (err, data) {
        // Turning all the data into an array of objects
        var allPeople = !data ? [] : JSON.parse(data);
    
        var filtered = _.filter(allPeople, (p) => {
            // Checking if there isn't a name or the name matches the input
            var isNamePass = !req.query.name || _.every(req.query.name.split(","), (word) => {
                return p.name.toLowerCase().indexOf(word.toLowerCase()) != -1;
            });

            // Checking if there isn't a phone or the phone matches the input
            var isPhonePass = !req.query.phone || req.query.phone == p.phone.replace("-", "");
            
            // Checking if there isn't an age or the age matches the input
            var isAgePass = !req.query.age || req.query.age == new Date().getFullYear() - new Date(p.birthday).getFullYear();

            return isNamePass && isPhonePass && isAgePass;
        });

        res.send(JSON.stringify(filtered));
        res.end();
    });
});

router.get('/all', function(req, res, next) {
    fs.readFile('DB/people.json', 'utf8', function (err, data) {
        // Turning all the data into an array of objects
        var allPeople = !data ? [] : JSON.parse(data);

        res.send(JSON.stringify(allPeople));
        res.end();
    });
});
module.exports = router;