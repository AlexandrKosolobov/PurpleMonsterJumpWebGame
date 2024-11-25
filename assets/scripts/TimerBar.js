// TimerBar.js

cc.Class(
    {
    extends: cc.Component,

    properties: 
    {
        game:
        {
            default: null,
            type: cc.Node
        },

        bar:
        {
            default: null,
            type: cc.ProgressBar
        }
    },

    onLoad()
    {
        this.game = this.game.getComponent("Game");
        this.timerDuration = this.game.starDuration;
    },

    setTimer(dt)
    {
        this.bar.progress = dt;
        this.timerDuration = this.game.starDuration;
    },

    update(dt)
    {
        this.bar.progress += (dt / this.timerDuration);
        if (this.bar.progress >= 1)
        {
            this.game.onTimerEnded();
        }
    }

});
