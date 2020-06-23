//@ts-ignore
export class Flame extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/flame.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
