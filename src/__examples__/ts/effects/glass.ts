import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/glass.json';

export class Glass extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
