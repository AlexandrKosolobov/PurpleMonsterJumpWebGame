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
        this.particleSystem.duration = 0.2;
        this.particleSystem.playOnLoad = true;
        this.particleSystem.autoRemoveOnFinish = true;

        cc.log("StarParticle.js: StarParticle loaded");
    },
});
