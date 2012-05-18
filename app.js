var express = require('express'),
		routes = require('./routes');

var app = module.exports = express.createServer();

/**
 * Configuration
 */
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/static'));
	app.set('view options', {
		staticPrefix: ''
	});
});

app.configure('production', function(){
  app.use(express.errorHandler());
	
	// In production, all static content is on Amazon S3
	app.set('view options', {
		staticPrefix: 'http://url.for.amazon.s3'
	});
});

/*
 * Routes
 */
app.get('/', routes.index);
app.get('/random', routes.random);
app.get('/:vgs?', routes.clips);

app.listen(1337, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
