//@ts-ignore
export class TrailPixel extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/trail-pixel.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
