import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/thrust.json';

export class Thrust extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
