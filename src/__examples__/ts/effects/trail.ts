//@ts-ignore
export class Trail extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/trail.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
