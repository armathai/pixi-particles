/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/trail.json';

export class Trail extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}