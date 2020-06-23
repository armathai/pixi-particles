//@ts-ignore
export class SnowFlakes extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/snow-flakes.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
