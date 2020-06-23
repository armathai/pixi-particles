//@ts-ignore
export class Smoke extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/smoke.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
