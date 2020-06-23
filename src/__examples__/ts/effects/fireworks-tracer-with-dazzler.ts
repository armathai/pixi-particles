//@ts-ignore
export class FireworksTracerWithDazzler extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/fireworks-tracer-with-dazzler.json'));
    }

    public get duration(): number {
        return 3000;
    }
}
