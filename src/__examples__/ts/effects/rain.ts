//@ts-ignore
export class Rain extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/rain.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
