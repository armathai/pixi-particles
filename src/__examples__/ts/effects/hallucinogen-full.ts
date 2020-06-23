//@ts-ignore
export class HallucinogenFull extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/hallucinogen-full.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
