/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/thruster-pixel.json';

export class ThrusterPixel extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
