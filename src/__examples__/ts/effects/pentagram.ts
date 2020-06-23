//@ts-ignore
export class Pentagram extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/pentagram.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
