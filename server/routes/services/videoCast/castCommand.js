(function () {
	
	var commands = {
		NONE : 0,
		START : 1,
		STOP : 2
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
