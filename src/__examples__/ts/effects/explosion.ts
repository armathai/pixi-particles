/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/explosion.json';

export class Explosion extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1600;
    }
}
