//@ts-ignore
export class TrailFart extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/trail-fart.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
