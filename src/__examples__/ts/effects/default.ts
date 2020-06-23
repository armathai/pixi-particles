//@ts-ignore
export class Default extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/default.json'));
    }

    public get duration(): number {
        return 7000;
    }
}
