/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/glass.json';

export class Glass extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
