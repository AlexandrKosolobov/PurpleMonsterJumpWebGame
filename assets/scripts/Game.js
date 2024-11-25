// Game.js

// Main game component.
cc.Class(
    {
    extends: cc.Component,

    properties: 
    {
        starPrefab: 
        {
            default: null,
            type: cc.Prefab
        },

        ground: 
        {
            default: null,
            type: cc.Node
        },

        player: 
        {
            default: null,
            type: cc.Node
        },

        timerBar:
        {
            default: null,
            type: cc.Node
        },

        scoreLabel:
        {
            default: null,
            type: cc.Node
        },

        // Appears on star picked
        starParticlesPrefab: 
        {
            default: null,
            type: cc.Prefab
        },

        // Plays on star picked
        starAudio:
        {
            default: null,
            type: cc.AudioSource
        }

    },
    
    onLoad() 
    {
        this.player = this.player.getComponent("Player");
        this.timerBar = this.timerBar.getComponent("TimerBar");
        this.scoreLabel = this.scoreLabel.getComponent("ScoreLabel");
        // Duration of the star exists
        this.starDuration = 5;
        // Acceleration of the star to disappear
        this.starDurationModificator = 0.97;
        // The minimum distance of the star far from player
        this.starNewPositionInitialDistance = 160;
        // Modificate x coordinates of the star (to avoid screen edge)
        this.starNewPositionXModificator = 0.88;
        // The score value
        this.score = 0;
        // Highest point of the ground
        this.groundY = this.ground.y;

        this.spawnNewStar();
    },

    // Instantiate star on first load of the scene
    spawnNewStar() 
    {
        this.star = cc.instantiate(this.starPrefab).getComponent("Star");
        this.node.addChild(this.star.node);
        this.star.node.setPosition(this.getNewStarPosition());
    },

    // Moves the star away from player, adds score, plays sound, 
    //      resets timer and plays particles on the star picked
    onStarPicked()
    {
        this.starAudio.play();
        this.score++;
        this.starDuration *= this.starDurationModificator;
        // Particles play on load
        this.starParticle = cc.instantiate(this.starParticlesPrefab);
        this.starParticle.setPosition(this.star.node.getPosition());
        this.star.node.setPosition(this.getNewStarPosition());
        this.scoreLabel.setScore(this.score);
        this.timerBar.setTimer(0);
    },

    // Game over. Adds cookie and load MainMenu scene
    onTimerEnded()
    {
        var cookie = "score=" + this.score;
        document.cookie = cookie;
        cc.director.loadScene("MainMenu");
    },

    // Finds new position for the star
    getNewStarPosition() 
    {
        do 
        {
            var randX = 0;
            var randY = this.groundY + Math.random() * this.player.jumpHeight + 20;
            var maxX = this.node.width/2;
            randX = (Math.random() - 0.5) * 2 * maxX * this.starNewPositionXModificator;
        } 
        while (cc.v2(randX, randY).sub(this.player.node.getPosition()).mag() 
            <= this.starNewPositionInitialDistance);

        return cc.v2(randX, randY);
    },
    
});
