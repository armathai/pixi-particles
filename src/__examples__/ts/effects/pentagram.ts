import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/pentagram.json';

export class Pentagram extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
