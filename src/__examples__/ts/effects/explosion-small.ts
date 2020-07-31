/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/explosion-small.json';

export class ExplosionSmall extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1600;
    }
}
