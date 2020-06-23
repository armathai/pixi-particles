//@ts-ignore
export class ExplosionSmall extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/explosion-small.json'));
    }

    public get duration(): number {
        return 1600;
    }
}
