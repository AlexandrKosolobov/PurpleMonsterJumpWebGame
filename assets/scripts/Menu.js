// Menu.js

cc.Class({
    extends: cc.Component,
    
    properties:
    {
        scoreLabel:
        {
            default: null,
            type: cc.Label
        }
    },

    onLoad()
    {
        this.bestScore = 0;
        this.newScore = 0;
        this.isMainSceneLoaded = false;
        cc.director.preloadScene("MainScene", this.onProgressMainScene, this.onLoadedMainScene);
    },

    onProgressMainScene(completedCount, totalCount, item)
    {

    },

    onLoadedMainScene(error)
    {

    },

    onGameOver()
    {
        this.newScore = document.cookie.match(/(score=)\d{1,}/g)[0].match(/\d{1,}/g)[0];
        this.bestScore = document.cookie.match(/(bestScore=)\d{1,}/g)[0].match(/\d{1,}/g)[0];

        if (this.bestScore = "") this.bestScore = 0;

        if(this.newScore > this.bestScore)
        {
            this.bestScore = this.newScore;
            document.bestScore = "bestScore=" + this.newScore;
        }
        this.scoreLabel.string = "Game score: " + this.newScore + "\nBest score: " + this.bestScore;
    },

    play()
    {
        if (!this.isMainSceneLoaded)
        {
            this.isMainSceneLoaded = true;
            cc.director.loadScene("MainScene");
        }
        else
        {
            cc.director.runScene("MainScene");
        }
    },

});
