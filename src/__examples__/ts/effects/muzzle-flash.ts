/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/muzzle-flash.json';

export class MuzzleFlash extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 300;
    }
}
