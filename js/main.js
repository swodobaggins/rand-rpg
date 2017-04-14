var game = new Phaser.Game(640, 360, Phaser.AUTO);
var width = 640;
var height = 360;
var score = 0;
var plyrVelocity = 2.5;
var boots;
var player;
var BootsText;
var bgTile;




function ostRemoval(){
    BootsText.destroy();
}
var GameState = {
    // Used for loading game assets before player's "game" start
    preload: function(){
        console.log("Preloading staring.");
        this.load.image('background', 'img/img_bg.png');
        this.load.image('player', 'img/spr_wizard.png');
        this.load.image('bootsSpeed', 'img/spr_boots.png');

    },

    // Executed after everything is preloaded
    create: function() {
        console.log("Create function starting.");
        game.world.setBounds(0, 0, 20000, 20000);
        //Stars the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bgTile = this.game.add.tileSprite(0, 0, 20000, 20000, 'background');
        this.player = this.game.add.sprite(width/2, height-65, 'player');
        this.boots = this.game.add.sprite(width/2, height/2, 'bootsSpeed');

        boots = this.boots;
        player = this.player;
        bgTile = this.bgTile;

        //Sets the camera
        game.camera.follow(this.player);


        //Enables the physics for sprites/objects
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.physics.enable(this.boots, Phaser.Physics.ARCADE);

        //Detects keyboard input from player
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.A,
            Phaser.Keyboard.D,
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.W,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.S
            ]
        );



        console.log("Starting game loop.");
    },

    update: function() {
        //Handles detected movement from create function
        // HANDLES LEFT AND RIGHT MOTION ONLY.
        if (game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            //moves right
            this.player.x += plyrVelocity;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.player.x -= plyrVelocity;
        }

        // HANDLES UP AND DOWN MOVEMENT
        if (game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            //moves right
            this.player.y -= plyrVelocity;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.player.y += plyrVelocity;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            ostRemoval();
        }

        game.physics.arcade.collide(this.player, this.boots, function(){
            plyrVelocity = 3.6;
            boots.destroy();
            var BootsTextStyle = { font: "32px Arial", fill: "#ff0044", align: "center", backgroundColor: "#ffff00" };
            BootsText = game.add.text(1, 1, "You've picked up the boots!", BootsTextStyle);
            BootsText.fixedToCamera = true;
        });
    }


};

game.state.add('GameState', GameState);
game.state.start('GameState');
