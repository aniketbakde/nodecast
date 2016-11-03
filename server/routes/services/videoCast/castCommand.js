(function () {

	var commands = {
		NONE : 0,
		START : 1,
		PLAY : 2,
		PAUSE : 3,
		STOP : 4,
		STATUS : 5,
		SEEK : 6
	};

	function CastCommands(cmd) {
		return {
			value : (commands[cmd.toUpperCase()] ? commands[cmd.toUpperCase()] : commands.NONE),
			commands : commands
		};
	}

	module.exports = CastCommands;
}
	());
