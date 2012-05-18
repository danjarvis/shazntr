var ClipProvider = require('dao/ClipProvider.js').ClipProvider;
var MessageProvider = require('dao/MessageProvider.js').MessageProvider;
var clipDao = new ClipProvider();
var messageDao = new MessageProvider();

/* GET: / */
exports.index = function(req, res) {
  res.render('index', {
		message: 'S H A Z B O T.',
		forClips: false,
		commands: clipDao.getSupportedCommands()
	});
};

/* GET: /:vgs? */
exports.clips = function(req, res) {
	// Grab list of .ogg files and pass them to clips.ejs	
	res.render('clips',{
		clips: clipDao.getClips(req),
		message: messageDao.getMessage(),
		forClips: true
	});	
};

/* GET: /random */
exports.random = function(req, res) {
	res.render('clips', {
		clips: clipDao.getRandomClips(),
		message: messageDao.getMessage(),
		forClips: true
	});
};
