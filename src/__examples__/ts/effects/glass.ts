//@ts-ignore
export class Glass extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/glass.json'));
    }

    public get duration(): number {
        return 1500;
    }
}
