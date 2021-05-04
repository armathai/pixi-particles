import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/splash-pixel.json';

export class SplashPixel extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 4000;
    }
}
