//@ts-ignore
export class Splash extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/splash.json'));
    }

    public get duration(): number {
        return 4000;
    }
}
