import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/fireball-blue.json';

export class FireballBlue extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
