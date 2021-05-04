import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/stink.json';

export class Stink extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
