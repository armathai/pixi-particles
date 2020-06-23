//@ts-ignore
export class Star extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/star.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
