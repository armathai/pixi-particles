//@ts-ignore
export class Starlight extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/starlight.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
