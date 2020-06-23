//@ts-ignore
export class RainCinematic extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/rain-cinematic.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
