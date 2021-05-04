import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/dust-left.json';

export class DustLeft extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1500;
    }
}
