import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/fireworks-tracer.json';

export class FireworksTracer extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 3000;
    }
}
