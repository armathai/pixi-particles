/// <reference path="../../../../bin/pixi-particles.d.ts" />
export class Confetti extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/confetti.json'));
    }

    public get duration(): number {
        return 4000;
    }
}
