/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/splash-pixel.json';

export class SplashPixel extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 4000;
    }
}
