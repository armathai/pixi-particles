import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/hallucinogen.json';

export class Hallucinogen extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
