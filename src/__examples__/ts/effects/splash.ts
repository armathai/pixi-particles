import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/splash.json';

export class Splash extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 4000;
    }
}
