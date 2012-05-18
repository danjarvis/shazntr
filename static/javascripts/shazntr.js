$(document).ready(function() {
	var shaz = new Shazntr();
	shaz.load();
});

function Shazntr()
{
	var clipCount = null;
	var clipsReady = null;
	var isPlayingBack = false;

	this.load = function()
	{
		this.clipsReady = 0;
		this.clipCount = $("#clip_count").val();

		// Tell all audio elements to report when they are ready
		var me = this;
		$("audio").bind("canplaythrough", function() {
				me.clipReady();
		});

		this.setupUI();
	};

	this.setupUI = function()
	{
		$("#create_button").on("click", this.create_button_onClick);
		$("#cancel_button").on("click", this.cancel_create_button_onClick);
		$("#play_button").on("click", this.play_button_onClick);
		$("#random_button").on("click", this.random_button_onClick);
		$("#home_button").on("click", this.home_button_onClick);
		$("#replay_button").on("click", {me: this}, this.replay_button_onClick);
		$("#help_button").on("click", this.help_button_onClick);
		$("#info_dialog_close_button").on("click", this.info_dialog_close_button_onClick);
		$(".info-nav li a").on("click", {me: this}, this.info_nav_onClick);
	};

	this.clipReady = function()
	{
		if (this.clipsReady == this.clipCount)
			return;

		this.clipsReady += 1;

		// Start playing audio after all clips are ready
		if (this.clipsReady == this.clipCount) {
			var me = this;
			setTimeout(function() {
				$("div.loading-modal-wrapper").hide();
				me.playClip(0, false);
				me.isPlayingBack = true;
			}, 500);
		}
	};

	/**
	 * Play a clip and set the timeout for the next clip to be played.
	 */
	this.playClip = function(number, isReplay)
	{
		if (number == this.clipCount) {
			// Show the action buttons
			if (!isReplay)
				$("#main_buttons").fadeIn();
			this.isPlayingBack = false;
			return;
		}

		// Fade / Highlight this clip in before playing it...
		if (!isReplay)
			$("#clip_wrapper_" + number).fadeIn();
		else
			$("#clip_wrapper_" + number).effect("bounce", {times: 3, distance: 10}, 300);

		var clip = $("#clip_" + number).get(0);
		var duration = $("source", clip).attr("duration");
		clip.play();

		var me = this;
		setTimeout(function() {
			me.playClip(number + 1, isReplay);
		}, (duration * .85));
	};

	/**
	 * Handle the create_button click event.
	 *  -hide #home_buttons and show #create_interface
	 */
	this.create_button_onClick = function()
	{
		$("#create_text_input").val("");
		$("#home_buttons").animate({left: -960}, 300, "linear");
		$("#create_interface").animate({left: 960}, 300, "linear", function() {
			$("#create_text_input").focus();
		});
	};

	/**
	 * Handle the cancel_create_button click event.
	 *  - hide #create_interface and show #home_buttons
	 */
	this.cancel_create_button_onClick = function()
	{
		$("#create_text_input").val("");
		$("#create_interface").animate({left: 1920}, 300, "linear");
		$("#home_buttons").animate({left: 960}, 300, "linear");
	};

	/**
	 * Play a new shazinator-thingy.
	 */
	this.play_button_onClick = function()
	{
		var phrase = $("#create_text_input").val();
		if (phrase != null && phrase.length > 2)
			window.location = "/" + phrase;
	};

	/**
	 * Replay the previous shazinator-thingy.
	 */
	this.replay_button_onClick = function(event)
	{
		if (event.data.me.isPlayingBack != true) {
			event.data.me.playClip(0, true);
			event.data.me.isPlayingBack = true;
		}
	};

	/**
	 * Request a random shazinator-thingy.
	 */
	this.random_button_onClick = function()
	{
		window.location = "/random/";
	};

	/**
	 * Go Home...
	 */
	this.home_button_onClick = function()
	{
		window.location = "/";
	};

	/**
	 * Show the Help / Info Modal Dialog
	 */
	this.help_button_onClick = function()
	{
		$("#info_modal_wrapper").fadeIn(400, function() {
			$("#info_dialog").fadeIn("slow");
		});
	};

	/**
	 * Close the Help / Info Modal Dialog
	 */
	this.info_dialog_close_button_onClick = function()
	{
		$("#info_dialog").fadeOut("slow", function() {
			$("#info_modal_wrapper").fadeOut();
		});
	};

	/**
	 * Info Dialog Navigation Logic
	 */
	this.info_nav_onClick = function(event)
	{
		var e = event.target.id; 											// what was clicked
		var s = $("ul.info-nav a.selected").get(0); 	// what is selected;
		var sid = $(s).attr("id");

		if (sid == e)
			return;

		$(s).removeClass("selected");
		$(s).next("span").removeClass("selected");
		$("#" + e).addClass("selected");
		$("#" + e).next("span").addClass("selected");

		// Fade In callback
		var fadeInCallback = function() {
			if (e == "info_nav_about")
				$("#info_about").fadeIn(400);
			else if (e == "info_nav_usage")
				$("#info_usage").fadeIn(400);
			else
				$("#info_commands").fadeIn(400);
		};

		// Fade out what is currently selected
		if (sid == "info_nav_about")
			$("#info_about").fadeOut(400, fadeInCallback);
		else if (sid == "info_nav_usage")
			$("#info_usage").fadeOut(400, fadeInCallback);
		else
			$("#info_commands").fadeOut(400, fadeInCallback);
	};
};
