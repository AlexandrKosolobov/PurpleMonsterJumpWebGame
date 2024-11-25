// Star.js

cc.Class(
    {
    extends: cc.Component,

    properties: 
    {
        
    },

    onLoad() 
    {
        // Using cc.find because Star.js is using for cc.Prefab
        this.game = cc.find("Canvas").getComponent("Game");
        this.pickRadius = 60;
    },

    update() 
    {
        this.checkStarPicked();
    },

    getPlayerDistance() 
    {
        var playerPos = this.game.player.node.getPosition();
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    checkStarPicked()
    {
        if (this.getPlayerDistance() < this.pickRadius) 
        {
            this.game.onStarPicked();
        }
    },
});