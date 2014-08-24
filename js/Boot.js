var LD30 = {};

LD30.Boot = function (game) {
    "use strict";

};

LD30.Boot.prototype = {
	preload: function () {
        "use strict";

		//this.load.image('preloaderBackground', 'img/preload_background.png');
		//this.load.image('preloaderBar', 'img/preload_bar.png');
	},

	create: function () {
        "use strict";
		this.game.input.maxPointers = 1;

		this.game.stage.disableVisibilityChange = true;

	    if (this.game.device.desktop)
	    {
		    this.game.stage.scale.pageAlignHorizontally = true;
	    }
	    else
	    {
		    this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		    this.game.stage.scale.minWidth = 480;
		    this.game.stage.scale.minHeight = 260;
		    this.game.stage.scale.maxWidth = 1024;
		    this.game.stage.scale.maxHeight = 768;
		    this.game.stage.scale.forceLandscape = true;
		    this.game.stage.scale.pageAlignHorizontally = true;
		    this.game.stage.scale.setScreenSize(true);
	    }
        this.game.state.add('Preloader', LD30.Preloader);
        this.game.state.add('Game', LD30.Game);
        //game.state.add('Preloader', LD30.Preloader);

		this.game.state.start('Preloader');
	}
};
