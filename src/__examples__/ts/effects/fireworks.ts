/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/fireworks.json';

export class Fireworks extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1200;
    }
}
