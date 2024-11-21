// PlayButton.js

cc.Class({
    extends: cc.Component,

    properties:
    {
        menu:
        {
            default: null,
            type: cc.Node
        }
    },

    onLoad()
    {
        this.menu = this.menu.getComponent("Menu");
    },

    onClickButton()
    {
        this.menu.play();
    }
});
