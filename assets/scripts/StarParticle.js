// StarParticle.js

cc.Class({
    extends: cc.Component,

    properties: 
    {
       particleSystem:
       {
            default: null,
            type: cc.ParticleSystem
       }
    },

    onLoad()
    {
        this.existTime = 0;
        this.duration = 0.3;
        this.particleSystem.playOnLoad = true;
        this.particleSystem.autoRemoveOnFinish = true;

        cc.log("StarParticle.js: StarParticle loaded");
    },

    update(dt)
    {
        this.existTime += dt;
        if(this.existTime > this.duration)
        {
            this.node.destroy();
        }
    },

    onDestroy()
    {
        cc.log("StarParticle.js: StarParticle destroyed");
    }
});
