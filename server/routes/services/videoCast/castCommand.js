(function () {

	var commands = {
		NONE : 0,
		START : 1,
		STEPBACK : 2,
		FASTBACK : 3,
		BACK : 4,
		PLAY : 5,
		PAUSE : 6,
		STOP : 7,
		FORWARD : 8,
		FASTFORWARD : 9,
		STEPFORWARD : 10,
		STATUS: 11,
		SEEK: 12
	};

	var seekDiffDuration = {
		2 : -60,
		3 : -10,
		4 : -1,
		8 : 1,
		9 : 10,
		10 : 60
	};

	function CastCommands(cmd) {
		return {
			value : (commands[cmd.toUpperCase()] ? commands[cmd.toUpperCase()] : commands.NONE),
			commands : commands,
			seekDiffDuration : seekDiffDuration
		};
	}

	module.exports = CastCommands;
}
	());
