/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/splash.json';

export class Splash extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 4000;
    }
}
