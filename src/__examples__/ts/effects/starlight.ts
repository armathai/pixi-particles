import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/starlight.json';

export class Starlight extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
