// Star.js

cc.Class(
    {
    extends: cc.Component,

    properties: 
    {

        pickRadius: 60,

        game: 
        {
            default: null,
            type: cc.Node
        }
        
    },

    getPlayerDistance() 
    {
        if (typeof this.game !== 'undefined')
        {
            var playerPos = this.game.playerNode.getPosition();
        }
        else
        {
            cc.log("Star.js: typeof this.game == undefined");
            return 0;
        }

        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked() 
    {
        if (typeof this.game !== 'undefined')
        {
            this.game.onStarPicked();
        }
        else
        {
            cc.log("Star.js: typeof this.game == undefined");
            this.destroy();
            return 0;
        }
    },

    onLoad() 
    {
        // Using cc.find becouse Star.js is using for cc.Prefab and can't be preinitialized
        this.game = cc.find("Canvas").getComponent("Game");
    },

    update(dt) 
    {
        if (this.getPlayerDistance() < this.pickRadius) 
        {
            this.onPicked();
            return;
        }
    },

});