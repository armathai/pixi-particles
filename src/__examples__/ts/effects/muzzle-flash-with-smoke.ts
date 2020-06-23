//@ts-ignore
export class MuzzleFlashWithSmoke extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/muzzle-flash-with-smoke.json'));
    }

    public get duration(): number {
        return 600;
    }
}
