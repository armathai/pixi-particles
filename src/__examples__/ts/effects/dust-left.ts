//@ts-ignore
export class DustLeft extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/dust-left.json'));
    }

    public get duration(): number {
        return 1500;
    }
}
