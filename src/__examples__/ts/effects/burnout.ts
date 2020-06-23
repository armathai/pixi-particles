export class Burnout extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/burnout.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
