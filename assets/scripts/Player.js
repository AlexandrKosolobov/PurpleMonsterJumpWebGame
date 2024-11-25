//Player.js

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 250,
        jumpDuration: 0.5,
        maxMoveSpeed: 400,
        accel: 1000,
        deccel: 0.92,

        jumpAudio:
        {
            default: null,
            type: cc.AudioSource
        }
    },

    runJumpAction() {
        var startJump = cc.tween()
        .call(() => { this.isJumping = true });
        var jumpUp = cc.tween()
        .by(this.jumpDuration, { y: this.jumpHeight}, { easing: 'sineOut' });
        var jumpDown = cc.tween()
        .by(this.jumpDuration, { y: -this.jumpHeight}, { easing: 'sineIn' });
        var endJump = cc.tween()
        .call(() => { this.isJumping = false });

        var scaleJump = cc.tween()
        .to(this.jumpDuration * 0.6, {scaleX: 0.4, scaleY: 1.5}, {easing: 'sineOut'})
        .to(this.jumpDuration * 0.4, {scaleX: 1, scaleY: 0.6}, {easing: 'sineIn'})
        .to(this.jumpDuration * 0.8, {scaleX: 0.4, scaleY: 1.5}, {easing: 'sineIn'})
        .to(this.jumpDuration * 0.2, {scaleX: 1.6, scaleY: 0.3}, {easing: 'sineOut'})
        .to(this.jumpDuration * 0.2, {scaleX: 1, scaleY: 1}, {easing: 'sineIn'})
        
        var jumpMove = cc.tween().sequence(startJump, jumpUp, jumpDown, endJump)
        var tween = cc.tween().parallel(jumpMove, scaleJump);

        return tween;
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
                this.isWPressed = true;
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
                this.isWPressed = false;
                break;
        }
    },

    onLoad() {
        this.accLeft = false;
        this.accRight = false;
        this.isWPressed = false;
        this.isJumping = false;

        this.groundY = this.node.y;

        this.jumpAction = cc.tween(this.node).then(this.runJumpAction());

        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.canvas = cc.director.getScene().getChildByName("Canvas");
    },

    update(dt) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        } else {
            this.xSpeed *= this.deccel;
        }

        if (this.isWPressed && !this.isJumping) {
            this.jumpAudio.play();
            this.jumpAction.start();
        }
        
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
        
        if (this.canvas.width/2 < this.node.x + this.node.width/2 
            || -this.canvas.width/2 > this.node.x - this.node.width/2) 
            this.xSpeed-=2*this.xSpeed;
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

});
