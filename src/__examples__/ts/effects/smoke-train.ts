//@ts-ignore
export class SmokeTrain extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/smoke-train.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
