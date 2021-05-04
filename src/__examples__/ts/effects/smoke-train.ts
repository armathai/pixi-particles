import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/smoke-train.json';

export class SmokeTrain extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
