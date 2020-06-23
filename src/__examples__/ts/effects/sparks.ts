//@ts-ignore
export class Sparks extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/sparks.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
