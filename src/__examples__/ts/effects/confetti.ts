/// <reference path="../../../../bin/pixi-particles.d.ts" />

import config from '../../assets/effects/confetti.json';

export class Confetti extends PIXI.particles.core.ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 4000;
    }
}
