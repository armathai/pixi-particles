import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/thruster-pixel.json';

export class ThrusterPixel extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
