//@ts-ignore
export class SplashPixel extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/splash-pixel.json'));
    }

    public get duration(): number {
        return 4000;
    }
}
