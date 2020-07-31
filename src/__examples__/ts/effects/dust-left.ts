/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/dust-left.json';

export class DustLeft extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
