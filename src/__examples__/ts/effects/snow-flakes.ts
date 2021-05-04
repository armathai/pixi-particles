import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/snow-flakes.json';

export class SnowFlakes extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
