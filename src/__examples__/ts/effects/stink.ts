//@ts-ignore
export class Stink extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/stink.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
