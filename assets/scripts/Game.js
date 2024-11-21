// Game.js

cc.Class(
    {
    extends: cc.Component,

    properties: 
    {

        starDuration: 2.5,
        score: 0,

        newStar:
        {
            default: null,
            type: cc.Node
        },

        starPrefab: 
        {
            default: null,
            type: cc.Prefab
        },

        groundNode: 
        {
            default: null,
            type: cc.Node
        },

        playerNode: 
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

        mainMenuScene:
        {
            default: null,
            type: cc.SceneAsset
        },

    },
    
    onLoad() 
    {
        this.groundY = this.groundNode.y;
        this.spawnNewStar();
    },

    spawnNewStar() 
    {
        this.newStar = cc.instantiate(this.starPrefab).getComponent("Star");
        this.node.addChild(this.newStar.node);
        this.newStar.node.setPosition(this.getNewStarPosition());
    },

    onStarPicked()
    {
        this.score++;
        this.newStar.node.setPosition(this.getNewStarPosition());
        this.scoreLabel.getComponent("ScoreLabel").setScore(this.score);
        this.timerBar.getComponent("TimerBar").setTimer(0);
    },

    onTimerEnded()
    {
        var cookie = "score=" + this.score;
        document.cookie = cookie;
        cc.director.loadScene("MainMenu", this.onMainMenuLoaded);
    },    
    
    onMainMenuLoaded()
    {
        cc.find("Canvas").getComponent("Menu").onGameOver();
    },

    getNewStarPosition() 
    {
        do 
        {
            var randX = 0;
            var randY = this.groundY + Math.random() * this.playerNode.getComponent('Player').jumpHeight + 30;
            var maxX = this.node.width/2;
            randX = (Math.random() - 0.5) * 2 * maxX;
        } 
        while (cc.v2(randX, randY).sub(this.playerNode.getPosition()).mag() <= 160);

        return cc.v2(randX, randY);
    },
    
});
