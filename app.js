var express = require('express'),
		routes = require('./routes');

var app = module.exports = express.createServer(express.logger());

/**
 * Configuration
 */
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/static'));
	app.set('view options', {
		staticPrefix: '',
		staticSuffix: ''
	});
  app.use(app.router);
});

app.configure('production', function(){
  app.use(express.errorHandler());
	
	// In production, all static content is on Amazon S3
	app.set('view options', {
		staticPrefix: 'https://s3.amazonaws.com/shazinator',
		staticSuffix: ''
	});
  app.use(app.router);
});

/*
 * Routes
 */
app.get('/', routes.index);
app.get('/random', routes.random);
app.get('/killyourself', routes.noie);
app.get('/:vgs?', routes.clips);
app.get('*', routes.invalid);

app.listen(process.env.PORT || 1337, function(){
  console.log("The Shazinator is listening on port %d in %s mode", app.address().port, app.settings.env);
});
