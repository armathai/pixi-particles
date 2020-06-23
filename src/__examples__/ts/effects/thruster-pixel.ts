//@ts-ignore
export class ThrusterPixel extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/thruster-pixel.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
