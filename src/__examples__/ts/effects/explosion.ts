//@ts-ignore
export class Explosion extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/explosion.json'));
    }

    public get duration(): number {
        return 1600;
    }
}
