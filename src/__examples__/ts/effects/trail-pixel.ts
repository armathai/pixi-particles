import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/trail-pixel.json';

export class TrailPixel extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
