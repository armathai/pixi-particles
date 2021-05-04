import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/confetti.json';

export class Confetti extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 4000;
    }
}
