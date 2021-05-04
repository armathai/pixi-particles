import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/explosion.json';

export class Explosion extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1600;
    }
}
