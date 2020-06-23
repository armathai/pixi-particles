//@ts-ignore
export class PentagramGlitchy extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/pentagram-glitchy.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
