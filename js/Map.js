
LD30.Map = function (game, offset, mapFile) {
    "use strict";

    this.group = game.add.group();
    this.group.x = LD30.Map.HORIZONTAL_SEPERATION * offset.x;
    this.group.y = LD30.Map.VERTICAL_SEPERATION * offset.y;

    this.map = game.add.tilemap(mapFile);
    this.map.addTilesetImage('Tiles', 'tiles');
    this.group.add(this.map.createLayer(0));
    this.physicsLayer = this.map.createLayer(1);

    this.map.setCollision(11, true, 1);

    this.player = game.add.sprite(300, 190, 'player');
    this.player.frame = 1;
    this.player.smoothed = false;
    this.player.anchor.set(0.5);

    game.physics.enable(this.player);
    this.player.body.enable = false;
    this.player.body.setSize(24, 16, 1, 6);
    this.player.body.offset.y -= LD30.Map.HORIZONTAL_SEPERATION * offset.x;
    this.player.body.offset.y -= LD30.Map.VERTICAL_SEPERATION * offset.y;
    this.group.add(this.player);

    this.group.add(this.physicsLayer);

    this.group.add(this.map.createLayer(2));

    this._playerActive = false;
};

LD30.Map.prototype = {
    toggleActive: function () {
        "use strict";
        if (this._playerActive) {
            this.deactivate();
        } else {
            this.activate();
        }
    },

    activate: function () {
        "use strict";
        this.player.body.enable = true;
        this.player.frame = 0;
        this.group.moveUp(this.player);

        this._playerActive = true;
    },

    deactivate: function () {
        "use strict";
        this.player.body.enable = false;
        this.player.frame = 1;
        this.group.moveDown(this.player);

        this._playerActive = false;
    },

    getPlayer: function () {
        "use strict";
        return this.player;
    },

    updatePosition: function (position) {
        "use strict";
        if (!this._playerActive) {
            this.player.position = position;
        }
    },

    collide: function (physics) {
        "use strict";
        if (this._playerActive) {
            physics.collide(this.player, this.physicsLayer);
        }
    }
};

LD30.Map.VERTICAL_SEPERATION = 352;
LD30.Map.HORIZONTAL_SEPERATION = 608;

