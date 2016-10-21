var express = require('express');
var router = express.Router();
//var fs = require('fs');

var watson = require('watson-developer-cloud');
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
  api_key: '9c6313e33e3c9807b9ae41132e414838ba9465e2',
    version: 'v3',
  version_date: '2016-05-20'
}); 

/* GET home page. */
router.get('/', function(req, res){
     res.render('response', { title: 'My app eyeTranslate' });
});

var fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/upload', function(req, res) {
        var sampleFile;
        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }

        sampleFile = req.files.sampleFile;
        sampleFile.mv('public/images/sampleFile.jpg', function(err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                //res.send('File uploaded!');
                
                var params = {
                  images_file: fs.createReadStream('public/images/samplefile.jpg')
                };

                
                visual_recognition.classify(params, function(err, watRes){
                    if (err){
                        console.log(err);
                        //res.send(err);
                    }
                    else{
                        //console.log(JSON.stringify(watRes, null, 2));
                        //res.json(watRes);
                        var classes = watRes.images[0].classifiers[0].classes;
                        var context  = { classes: classes }
                        console.log(JSON.stringify(context, null, 2));

                        res.render('response', context);

                        //appRes.send('<b>Hello World</b> yay');

                    }
                }); 

                
                
                //res.render('response', { title: 'My app eyeTranslate' });
            }
        });
});



////visual stuff
//var params = {
//  images_file: fs.createReadStream('./public/images/samplefile.jpg')
//};
//
//router.get('/translate', function (req, appRes) {
//
//    visual_recognition.classify(params, function(err, res){
//        if (err){
//            console.log(err);
//            //res.send(err);
//        }
//        else{
//            console.log(JSON.stringify(res, null, 2));
//            appRes.json(res);
//            //appRes.send('<b>Hello World</b> yay');
//
//        }
//    }); 
//
//}); 
//
//module.exports = router;
//visual stuff
//var params = {
//  images_file: fs.createReadStream('./public/images/fireworks.jpg')
//};
//
//router.get('/firework', function (req, appRes) {
//
//     visual_recognition.classify(params, function(err, watRes){
//                    if (err){
//                        console.log(err);
//                        //res.send(err);
//                    }
//                    else{
//                        //console.log(JSON.stringify(watRes, null, 2));
//                        //res.json(watRes);
//                        var classes = watRes.images[0].classifiers[0].classes;
//                        var context  = { classes: classes }
//                        console.log(JSON.stringify(context, null, 2));
//
//                        res.render('response', context);
//
//                        //appRes.send('<b>Hello World</b> yay');
//
//                    }
//    }); 
//
//}); 
//
module.exports = router;