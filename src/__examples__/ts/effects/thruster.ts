//@ts-ignore
export class Thruster extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/thruster.json'));
    }

    public get duration(): number {
        return 9999999999;
    }
}
