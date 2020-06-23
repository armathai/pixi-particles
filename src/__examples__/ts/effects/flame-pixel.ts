//@ts-ignore
export class FlamePixel extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/flame-pixel.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
