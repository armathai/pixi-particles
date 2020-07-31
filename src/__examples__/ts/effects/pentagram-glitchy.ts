/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/pentagram-glitchy.json';

export class PentagramGlitchy extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
