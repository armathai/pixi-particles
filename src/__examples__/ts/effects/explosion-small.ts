import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/explosion-small.json';

export class ExplosionSmall extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1600;
    }
}
