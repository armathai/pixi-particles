//@ts-ignore
export class FireballBlue extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/fireball-blue.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
