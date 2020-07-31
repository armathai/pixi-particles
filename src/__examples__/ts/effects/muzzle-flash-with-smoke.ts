/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/muzzle-flash-with-smoke.json';

export class MuzzleFlashWithSmoke extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 600;
    }
}
