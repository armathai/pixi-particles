import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/flame.json';

export class Flame extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
