//@ts-ignore
export class Fireworks extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/fireworks.json'));
    }

    public get duration(): number {
        return 1200;
    }
}
