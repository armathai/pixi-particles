//@ts-ignore
export class Laser extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/laser.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
