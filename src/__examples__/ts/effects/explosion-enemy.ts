/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/explosion-enemy.json';

export class ExplosionEnemy extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1600;
    }
}
