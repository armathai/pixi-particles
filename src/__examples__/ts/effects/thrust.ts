//@ts-ignore
export class Thrust extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/thrust.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
