//@ts-ignore
export class Fireball extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/fireball.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
