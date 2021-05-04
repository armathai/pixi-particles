import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/dust.json';

export class Dust extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
