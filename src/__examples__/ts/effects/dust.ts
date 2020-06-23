//@ts-ignore
export class Dust extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/dust.json'));
    }

    public get duration(): number {
        return 1500;
    }
}
