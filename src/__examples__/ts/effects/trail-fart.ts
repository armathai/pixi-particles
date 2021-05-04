import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/trail-fart.json';

export class TrailFart extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 9999999999;
    }
}
