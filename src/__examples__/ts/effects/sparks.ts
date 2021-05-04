import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/sparks.json';

export class Sparks extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
