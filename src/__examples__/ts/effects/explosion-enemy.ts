//@ts-ignore
export class ExplosionEnemy extends PIXI.particles.core.ParticleEffect {
    constructor() {
        super(require('../../assets/effects/explosion-enemy.json'));
    }

    public get duration(): number {
        return 1600;
    }
}
