import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/fireworks.json';

export class Fireworks extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 1200;
    }
}
