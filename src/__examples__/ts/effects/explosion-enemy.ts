import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/explosion-enemy.json';

export class ExplosionEnemy extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1600;
    }
}
