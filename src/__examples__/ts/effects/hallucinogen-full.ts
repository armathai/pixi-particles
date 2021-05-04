import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/hallucinogen-full.json';

export class HallucinogenFull extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
