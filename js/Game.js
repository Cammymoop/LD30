    /*
     * Automatically Included properties:
     * this.game;		//	a reference to the currently running game
     * this.add;		//	used to add sprites, text, groups, etc
     * this.camera;	//	a reference to the game camera
     * this.cache;		//	the game cache
     * this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
     * this.load;		//	for preloading assets
     * this.math;		//	lots of useful common math operations
     * this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
     * this.stage;		//	the game stage
     * this.time;		//	the clock
     * this.tweens;	//	the tween manager
     * this.world;		//	the game world
     * this.particles;	//	the particle manager
     * this.physics;	//	the physics manager
     * this.rnd;		//	the repeatable random number generator
     */
LD30.Game = function (game) {
    "use strict";
};

LD30.Game.prototype = {
	create: function () {
        "use strict";
        this.game.stage.backgroundColor = '#222025';

        this.map1 = new LD30.Map(this.game, {x: 0, y: 0}, 'map1');
        this.map1.activate();

        this.map2 = new LD30.Map(this.game, {x: 0, y: 1}, 'map2');

        this.maps = {};
        for (var i = 1; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
                this.maps[i + ':' + j] = new LD30.Map(this.game, {x: i, y: j}, 'map2')
            }
        }

        this.curMap = this.map1;
        this.curPlayer = this.curMap.getPlayer();

        this.adjacentMaps = this.map2;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceHandled = false;

        this.camera.bounds = null;
        this.camera.x = -32;
        this.camera.y = -32;
	},

    swap: function () {
        "use strict";

        this.curMap.toggleActive();
        this.adjacentMaps.toggleActive();

        var m = this.curMap;
        this.curMap = this.adjacentMaps;
        this.curPlayer = this.curMap.getPlayer();

        this.adjacentMaps = m;
    },

	update: function () {
        "use strict";
        this.map1.collide(this.game.physics.arcade);
        this.map2.collide(this.game.physics.arcade);
        for (var map in this.maps) {
            map.collide(this.game.physics.arcade);
        }

        this.curPlayer.body.velocity.x = 0;
        this.curPlayer.body.velocity.y = 0;

        if (!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (this.spaceHandled) {
                this.spaceHandled = false;
            }
        } else if (!this.spaceHandled) {
            this.spaceHandled = true;
            this.swap();
        }

        var speed1 = 160;
        var speed2 = 113;
        var vertical = 0;
        var horizontal = 0;

        if (this.cursors.up.isDown) {
            vertical = -1;
        } else if (this.cursors.down.isDown) {
            vertical = 1;
        }

        if (this.cursors.left.isDown) {
            horizontal = -1;
        } else if (this.cursors.right.isDown) {
            horizontal = 1;
        }

        var speed = (horizontal !== 0 && vertical !== 0) ? speed2 : speed1;

        this.curPlayer.body.velocity.x = horizontal * speed;
        this.curPlayer.body.velocity.y = vertical * speed;

        this.adjacentMaps.updatePosition(this.curPlayer.position);
        for (var map in this.maps) {
            map.updatePosition(this.curPlayer.position);
        }
	},

    getMap: function (x, y) {
        "use strict";
        return this.assocMaps[x + ':'+ y];
    },
    
	quitGame: function () {
	}
};
