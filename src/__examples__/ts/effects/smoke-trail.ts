//@ts-ignore
export class SmokeTrail extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/smoke-trail.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
