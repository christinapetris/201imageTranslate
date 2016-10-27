//requiring dependencies 
var watson = require('watson-developer-cloud');
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
//var users = require('./routes/users');

var visual_recognition = watson.visual_recognition({
  api_key: '9c6313e33e3c9807b9ae41132e414838ba9465e2',
    version: 'v3',
  version_date: '2016-05-20'
});


//app gets started here
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//routes
//app.use('/', routes);
//app.use('/response', routes);
//app.use('/users', routes);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



//app.get('/', function(req, res){
//    res.render('index', { title: 'My app eyeTranslate' });
//});
//
//
//module.exports = app;

//probs wont work

var express = require('express');
//var router = express.Router();
//var fs = require('fs');

var watson = require('watson-developer-cloud');
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
  api_key: '9c6313e33e3c9807b9ae41132e414838ba9465e2',
    version: 'v3',
  version_date: '2016-05-20'
}); 

/* GET home page. */
app.get('/', function(req, res){
     res.render('index', { title: 'My app eyeTranslate' });
});

var fileUpload = require('express-fileupload');

app.use(fileUpload());
////translate
//var YandexTranslator = require('yandex.translate');
// 
//var translator = new YandexTranslator( {api_key: 'trnsl.1.1.20161026T062450Z.89b62e08b098b57e.1851fe527c17be56c938e48326f6c975ae7a7504'});
// 
//var translator.translate('hello', 'ru').then(console.log); // привет 
//var translator.detect('hello').then(console.log); // en 
//var translate = require('yandex-translate')( {api_key: 'trnsl.1.1.20161026T062450Z.89b62e08b098b57e.1851fe527c17be56c938e48326f6c975ae7a7504'});
// 
//translate.translate('You can burn my house, steal my car, drink my liquor from an old fruitjar.', { to: 'ru' }, function(err, res) {
//  console.log(res.text);
//});
// 
//translate.detect('Граждане Российской Федерации имеют право собираться мирно без оружия, проводить собрания, митинги и демонстрации, шествия и пикетирование', function(err, res) {
//   // res.lang -> 'ru' 
//});
////end translate

app.post('/upload', function(req, res) {
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
                  images_file: fs.createReadStream('public/images/sampleFile.jpg')
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
                    }
                }); 
            }
        });
});
//for testing
app.get('/translate', function(req, res) {
                        //res.render('response');
    
});

//saved photos
app.get('/fireworks', function(req, res) {
    var params = {
  images_file: fs.createReadStream('./images/fireworks.jpg')
};
       visual_recognition.classify(params, function(err, watRes){
                    if (err){
                        console.log(err);
                    }
                    else{
                        var classes = watRes.images[0].classifiers[0].classes;
                        var context  = { classes: classes }
                        console.log(JSON.stringify(context, null, 2));

                        res.render('fireworks', context);
                    }
                }); 
    
});
app.get('/mt-fuji', function(req, res) {
    var params = {
  images_file: fs.createReadStream('./images/mt-fuji.jpg')
};
       visual_recognition.classify(params, function(err, watRes){
                    if (err){
                        console.log(err);
                    }
                    else{
                        var classes = watRes.images[0].classifiers[0].classes;
                        var context  = { classes: classes }
                        console.log(JSON.stringify(context, null, 2));

                        res.render('mt-fuji', context);
                    }
                }); 
    
});
app.get('/tiger', function(req, res) {
    var params = {
  images_file: fs.createReadStream('./images/tiger.jpg')
};
       visual_recognition.classify(params, function(err, watRes){
                    if (err){
                        console.log(err);
                    }
                    else{
                        var classes = watRes.images[0].classifiers[0].classes;
                        var context  = { classes: classes }
                        console.log(JSON.stringify(context, null, 2));

                        res.render('tiger', context);
                    }
                }); 
    
});
app.get('/strawberries', function(req, res) {
    var params = {
  images_file: fs.createReadStream('./images/strawberries.jpg')
};
       visual_recognition.classify(params, function(err, watRes){
                    if (err){
                        console.log(err);
                    }
                    else{
                        var classes = watRes.images[0].classifiers[0].classes;
                        var context  = { classes: classes }
                        console.log(JSON.stringify(context, null, 2));

                        res.render('strawberries', context);
                    }
                }); 
    
});

app.get('/login', function(req, res) {
                        res.render('loginpage');
});
app.get('/about', function(req, res) {
                        res.render('about');
});
app.get('/profile', function(req, res) {
                        res.render('profile');
});
app.get('/search', function(req, res) {
                        res.render('search');
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});