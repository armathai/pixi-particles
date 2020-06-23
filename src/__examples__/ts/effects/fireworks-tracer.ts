//@ts-ignore
export class FireworksTracer extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/fireworks-tracer.json'));
    }

    public get duration(): number {
        return 3000;
    }
}
