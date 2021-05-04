import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/star.json';

export class Star extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
