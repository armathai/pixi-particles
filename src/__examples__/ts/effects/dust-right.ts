import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/dust-right.json';

export class DustRight extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
