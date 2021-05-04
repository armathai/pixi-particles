import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/fireworks-tracer-with-dazzler.json';

export class FireworksTracerWithDazzler extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 3000;
    }
}
