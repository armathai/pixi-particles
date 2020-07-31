/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/fireworks-tracer-with-dazzler.json';

export class FireworksTracerWithDazzler extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 3000;
    }
}
