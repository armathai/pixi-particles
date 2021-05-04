import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/rain-cinematic.json';

export class RainCinematic extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
