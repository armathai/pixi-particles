//@ts-ignore
export class Hallucinogen extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/hallucinogen.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
