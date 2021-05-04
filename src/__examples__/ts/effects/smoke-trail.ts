import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/smoke-trail.json';

export class SmokeTrail extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
