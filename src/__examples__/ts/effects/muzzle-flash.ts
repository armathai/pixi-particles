import { ParticleEffect } from '../../../ParticleEffect';
import config from '../../assets/effects/muzzle-flash.json';

export class MuzzleFlash extends ParticleEffect {
    public constructor() {
        super(config);
    }

    public get duration(): number {
        return 300;
    }
}
