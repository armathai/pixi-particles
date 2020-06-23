//@ts-ignore
export class DustRight extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/dust-right.json'));
    }

    public get duration(): number {
        return 1500;
    }
}
