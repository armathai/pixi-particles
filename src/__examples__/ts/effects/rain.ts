import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/rain.json';

export class Rain extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
