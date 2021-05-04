import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/laser.json';

export class Laser extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
