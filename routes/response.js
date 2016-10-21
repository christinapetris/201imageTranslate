var express = require('express');
var router = express.Router();

var watson = require('watson-developer-cloud');
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
  api_key: '9c6313e33e3c9807b9ae41132e414838ba9465e2',
    version: 'v3',
  version_date: '2016-05-20'
});
/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'My app eyeTranslate' });
//});

//visual stuff
var params = {
  images_file: fs.createReadStream('./tiger.jpg')
};

router.get('/', function (req, appRes) {

    visual_recognition.classify(params, function(err, res){
        if (err){
            console.log(err);
            //res.send(err);
        }
        else{
            console.log(JSON.stringify(res, null, 2));
            appRes.json(res);
            //appRes.send('<b>Hello World</b> yay');

        }
    });    
});

module.exports = router;
