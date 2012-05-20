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
	var requestedClips = clipDao.getClips(req);
	if (requestedClips != null && requestedClips.length > 0) {
		res.render('clips',{
			clips: requestedClips,
			message: messageDao.getMessage(),
			forClips: true,
			loadingMessage: messageDao.getLoadingMessage()
		});
	} else {
		res.render('invalid', {
			message: 'S H A Z B O T.',
			forClips: false,
			commands: clipDao.getSupportedCommands()
		});
	}
};

/* GET: /random */
exports.random = function(req, res) {
	res.render('clips', {
		clips: clipDao.getRandomClips(),
		message: messageDao.getMessage(),
		forClips: true,
		loadingMessage: messageDao.getLoadingMessage()
	});
};

/* GET: /killyourself */
exports.noie = function(req, res) {
	/**
	 * The reason I am not supporting the cesspool that is IE is _NOT_ because I am lazy.
	 * It is because the browser doesn't support the HTML 5 Audio API (<audio /> element).
	 */
	res.render('noie', {
		layout: false
	});
};

/* GET: Invalid Request */
exports.invalid = function(req, res) {
	res.render('invalid', {
		message: 'S H A Z B O T.',
		forClips: false,
		commands: clipDao.getSupportedCommands()
	});
};
