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
        this.score = this.getScore()
        this.bestScore = this.getBestScore();

        cc.director.preloadScene("MainScene");
    },

    getScore()
    {
        var raw = document.cookie.match(/(score=)\d{1,}/g);
        if(raw != null) return raw[0] == undefined ? 0 : raw[0].match(/\d{1,}/g);
        document.cookie = "score=0";
        return 0;
    },

    getBestScore()
    {
        var raw = document.cookie.match(/(bestScore=)\d{1,}/g);
        if(raw != null) return raw[0] == undefined ? 0 : raw[0].match(/\d{1,}/g);
        document.cookie = "bestScore=0";
        return 0;
    },

    start()
    {
        this.showScore();
    },

    showScore()
    {
        if(this.score == 'undefined') this.score = 0;
        if(this.bestScore == 'undefined') this.bestScore = 0;

        if(Number(this.score) > Number(this.bestScore))
        {
            this.bestScore = this.score;
            document.cookie = "bestScore=" + this.score;
        }
        this.scoreLabel.string = "Game score: " + this.score + "\nBest score: " + this.bestScore;
    },

    play()
    {
        cc.director.loadScene("MainScene");
    },

    onDestroy()
    {
        document.cookie = "score=0";
    }

});
