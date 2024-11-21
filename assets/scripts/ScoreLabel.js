// ScoreLabel.js

cc.Class(
    {
    extends: cc.Component,

    properties: 
    {
        label:
        {
            default: null,
            type: cc.Label
        }
    },

    setScore(newScore)
    {
        this.label.string = "Score: " + newScore;
    }

});
