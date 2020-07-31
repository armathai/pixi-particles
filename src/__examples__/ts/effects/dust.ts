/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/dust.json';

export class Dust extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
