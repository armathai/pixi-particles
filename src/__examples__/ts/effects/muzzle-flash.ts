//@ts-ignore
export class MuzzleFlash extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/muzzle-flash.json'));
    }

    public get duration(): number {
        return 300;
    }
}
